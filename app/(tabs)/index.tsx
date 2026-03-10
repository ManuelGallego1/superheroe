import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../src/constants/colors";

const FEATURES = [
  {
    icon: "auto-awesome" as const,
    title: "20 Superhéroes",
    description:
      "Explora una selección de los personajes más icónicos del universo Marvel y DC.",
    color: "#e94560",
  },
  {
    icon: "person-search" as const,
    title: "Biografía Detallada",
    description:
      "Conoce el nombre real, origen, editorial y primera aparición de cada héroe.",
    color: "#4ade80",
  },
  {
    icon: "bolt" as const,
    title: "Power Stats",
    description:
      "Visualiza inteligencia, fuerza, velocidad, durabilidad, poder y combate.",
    color: "#facc15",
  },
];

const HOW_IT_WORKS = [
  "La app carga 20 héroes usando IDs estáticos en paralelo con Promise.all.",
  "Cada tarjeta muestra nombre, editorial y alineación del personaje.",
  "Al tocar un héroe, se consulta la API para traer su detalle completo.",
  "El detalle incluye biografía, imagen y estadísticas de poder con barras.",
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Banner principal */}
        <View style={styles.banner}>
          <View style={styles.bannerIcon}>
            <MaterialIcons name="shield" size={56} color={COLORS.accent} />
          </View>
          <Text style={styles.bannerTitle}>SuperHero{"\n"}Explorer</Text>
          <Text style={styles.bannerSubtitle}>
            Descubre el universo de los superhéroes. Consulta poderes,
            biografías e historias directamente desde la SuperHero API.
          </Text>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => router.push("/(tabs)/heroes")}
            activeOpacity={0.85}
          >
            <MaterialIcons name="auto-awesome" size={18} color="#fff" />
            <Text style={styles.ctaText}>Ver Superhéroes</Text>
          </TouchableOpacity>
        </View>

        {/* Estadísticas rápidas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>En esta app</Text>
          <View style={styles.statsRow}>
            {[
              { number: "20", label: "Héroes" },
              { number: "6", label: "Power Stats" },
              { number: "2", label: "Universos" },
            ].map((s) => (
              <View key={s.label} style={styles.statBox}>
                <Text style={styles.statNumber}>{s.number}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Características */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>¿Qué puedes hacer?</Text>
          {FEATURES.map((f) => (
            <View key={f.title} style={styles.featureCard}>
              <View
                style={[
                  styles.featureIcon,
                  { backgroundColor: f.color + "22" },
                ]}
              >
                <MaterialIcons name={f.icon} size={28} color={f.color} />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureDesc}>{f.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Cómo funciona */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>¿Cómo funciona?</Text>
          {HOW_IT_WORKS.map((text, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepNumber}>{i + 1}</Text>
              </View>
              <Text style={styles.stepText}>{text}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1, backgroundColor: COLORS.background },
  banner: {
    alignItems: "center",
    padding: 32,
    paddingTop: 48,
    backgroundColor: COLORS.surface,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 24,
  },
  bannerIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.accent + "22",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  bannerTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "center",
    lineHeight: 44,
    marginBottom: 12,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: COLORS.textSub,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.accent,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 28,
  },
  ctaText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 16,
  },
  statsRow: { flexDirection: "row", gap: 10 },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
  },
  statNumber: { fontSize: 32, fontWeight: "bold", color: COLORS.accent },
  statLabel: { fontSize: 12, color: COLORS.textSub, marginTop: 4 },
  featureCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    gap: 14,
  },
  featureIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  featureText: { flex: 1 },
  featureTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 4,
  },
  featureDesc: { fontSize: 13, color: COLORS.textSub, lineHeight: 20 },
  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    gap: 14,
  },
  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.accent,
    justifyContent: "center",
    alignItems: "center",
  },
  stepNumber: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  stepText: {
    flex: 1,
    color: COLORS.textSub,
    fontSize: 14,
    lineHeight: 22,
    paddingTop: 4,
  },
});
