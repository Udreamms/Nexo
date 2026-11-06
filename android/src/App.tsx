import { createApiClient } from "@nexo/api-client";
import { formatoClp, formatoUf, type CotizacionResultado } from "@nexo/shared";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

export default function App() {
  const api = useMemo(() => createApiClient({ baseUrl: API_URL }), []);
  const [edad, setEdad] = useState("");
  const [sueldo, setSueldo] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultado, setResultado] = useState<CotizacionResultado | null>(null);

  async function calcular() {
    const anios = Number(edad.replace(/\D/g, ""));
    if (!anios) {
      setError("Ingresa tu edad");
      return;
    }
    setCargando(true);
    setError(null);
    try {
      setResultado(
        await api.calculateQuote({
          personas: [{ anios, esCarga: false }],
          sueldoLiquido: Number(sueldo.replace(/\D/g, "")) || 0,
        }),
      );
    } catch {
      setError("No pudimos calcular tus planes. Intenta de nuevo.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <View style={styles.body}>
        <Text style={styles.title}>Tu plan de Isapre en 60 segundos</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          placeholder="Tu edad"
          value={edad}
          onChangeText={setEdad}
        />
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          placeholder="Sueldo líquido (opcional)"
          value={sueldo}
          onChangeText={setSueldo}
        />
        <Pressable style={styles.button} onPress={calcular} disabled={cargando}>
          {cargando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Ver mis 3 mejores planes</Text>
          )}
        </Pressable>
        {error && <Text style={styles.error}>{error}</Text>}
        {resultado && (
          <View style={styles.results}>
            {Number(sueldo) > 0 && <Text>Tu 7% al mes: {formatoClp(resultado.sieteClp)}</Text>}
            {resultado.mejoresPlanes.map((plan, i) => (
              <Text key={`${plan.isapre}-${plan.baseUf}`} style={styles.plan}>
                {i + 1}. {plan.isapre} · {formatoUf(plan.totalUf)} / mes
              </Text>
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f6f4f0" },
  body: { padding: 24, gap: 14 },
  title: { fontSize: 26, fontWeight: "500", color: "#1c1f3a" },
  input: {
    backgroundColor: "#fff",
    borderColor: "#dcd8d0",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4a418a",
    borderRadius: 999,
    padding: 16,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "500" },
  error: { color: "#b00020" },
  results: { gap: 8, marginTop: 8 },
  plan: { fontSize: 17, color: "#1c1f3a" },
});
