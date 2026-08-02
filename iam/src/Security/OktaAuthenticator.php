<?php

namespace App\Security;

use App\Service\OktaJwtService;
use App\Service\UserProvisioningService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;

/**
 * @see https://symfony.com/doc/current/security/custom_authenticator.html
 */
class OktaAuthenticator extends AbstractAuthenticator
{
    public function __construct(
        private readonly OktaJwtService $jwtService,
        private readonly UserProvisioningService $userProvisioningService
    ) { }

    /**
     * Called on every request to decide if this authenticator should be
     * used for the request. Returning `false` will cause this authenticator
     * to be skipped.
     */
    public function supports(Request $request): ?bool
    {
        $authHeader = $request->headers->get('Authorization');

        return $authHeader !== null &&
            preg_match('/^Bearer\s+(\S*)/', $authHeader);
    }

    public function authenticate(Request $request): Passport
    {
        $authorization = $request->headers->get('Authorization');
        $parts = explode(' ', $authorization);

        try {
            $claims = $this->jwtService->verify($parts[1]);
        } catch (\Throwable $e) {
            throw new AuthenticationException(
                'Invalid access token',
                0,
                $e
            );
        }

        try {
            $oktaClaims = new OktaClaims($claims);
        } catch (\Throwable $e) {
            throw new AuthenticationException(
                'Invalid claims provided; claims need to include uid',
                0,
                $e
            );
        }

        return new SelfValidatingPassport(
            new UserBadge(
                $claims['uid'],
                fn () => $this->userProvisioningService
                    ->loadUserFromClaims($oktaClaims)
            )
        );
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        // on success, let the request continue
        return null;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        return new JsonResponse(
            [
                'error' => 'Unauthorized',
                'message' => $exception->getMessage()
            ],
            Response::HTTP_UNAUTHORIZED
        );
    }

    // public function start(Request $request, ?AuthenticationException $authException = null): Response
    // {
    //     /*
    //      * If you would like this class to control what happens when an anonymous user accesses a
    //      * protected page (e.g. redirect to /login), uncomment this method and make this class
    //      * implement Symfony\Component\Security\Http\EntryPoint\AuthenticationEntryPointInterface.
    //      *
    //      * For more details, see https://symfony.com/doc/current/security/experimental_authenticators.html#configuring-the-authentication-entry-point
    //      */
    // }
}
