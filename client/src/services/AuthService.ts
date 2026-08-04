import { okta } from "@/services/okta";
import { OktaAuthService } from "@/services/OktaAuthService";

export const authService = new OktaAuthService(okta);