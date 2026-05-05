import { Redirect } from "expo-router";
import { useAuth } from "../lib/auth";
import { BrandLoader } from "../components/BrandLoader";

/**
 * Entry redirect.
 * Customer (anonymous) is the default — the AuthProvider silently signs the
 * user in anonymously on first launch. Admins land in the admin group.
 */
export default function Index() {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return <BrandLoader />;
  }

  if (isAdmin) {
    return <Redirect href="/(admin)" />;
  }

  return <Redirect href="/(customer)" />;
}
