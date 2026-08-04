import { authService } from "@/services/AuthService";

async function request<T>(
    url: string,
    options: RequestInit = {},
    key: string|null = null,
): Promise<T> {
    const token = await authService.getAccessToken().then(
        (token) => token?.accessToken
    );

    const response = await fetch(url, {
        ...options,
        headers: {
            "content-Type": "application/json",
            Authorization: token
                ? `Bearer ${token}`
                : "",
            ...options.headers
        }
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.error?.message ?? "Unknown error");
    }

    if (key && json.data[key]) {
        return json.data[key];
    }

    return json.data;
}

export default request;