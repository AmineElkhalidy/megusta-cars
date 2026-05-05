import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

/** Map cryptic Firebase auth codes to plain-English messages staff can act on. */
function friendlyAuthError(code: string | undefined): string {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Email or password is incorrect.";
    case "auth/invalid-email":
      return "That email address looks invalid.";
    case "auth/too-many-requests":
      return "Too many attempts. Try again in a minute.";
    case "auth/network-request-failed":
      return "No internet connection. Check your network and retry.";
    case "auth/operation-not-allowed":
      return "Email/password sign-in is disabled for this project.";
    default:
      return "Sign in failed. Please try again.";
  }
}

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAdminLogin = async () => {
    if (!auth || !db) {
      setError("Firebase is not configured. Add your credentials to .env first.");
      return;
    }
    if (!email.trim() || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const cred = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      const adminDoc = await getDoc(doc(db, "admins", cred.user.uid));
      if (!adminDoc.exists()) {
        // Sign them straight back out — non-admin accounts can't use this screen.
        await auth.signOut();
        setError("This account isn't authorized for admin access.");
        return;
      }
      // Root layout handles the redirect to /(admin) once isAdmin flips to true.
    } catch (e: unknown) {
      const code =
        typeof e === "object" && e && "code" in e
          ? (e as { code?: string }).code
          : undefined;
      setError(friendlyAuthError(code));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.replace("/(customer)");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableOpacity style={styles.backButton} onPress={handleCancel}>
        <ArrowLeft size={20} color="#000" />
        <Text style={styles.backText}>Back to fleet</Text>
      </TouchableOpacity>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Admin Sign In</Text>
        <Text style={styles.subtitle}>
          For Megusta Cars staff. Customers can browse without signing in.
        </Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={[styles.loginButton, loading && styles.loginButtonDisabled]}
          onPress={handleAdminLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Sign in</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 56,
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  backText: {
    marginLeft: 8,
    fontSize: 15,
    color: "#000",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    color: "#000",
  },
  loginButton: {
    backgroundColor: "#000",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "#d32f2f",
    marginBottom: 12,
  },
});
