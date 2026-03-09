import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { COLORS } from '../../src/constants/colors';
import { getHeroById } from '../../src/services/heroService';

const { width } = Dimensions.get('window');

export default function HeroDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [hero, setHero] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHeroById(Number(id))
      .then(setHero)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  if (!hero) return null;

  const bio = hero.biography;
  const stats = hero.powerstats;
  const appearance = hero.appearance;
  const alignColor =
    bio.alignment === 'good' ? COLORS.good :
      bio.alignment === 'bad' ? COLORS.bad :
        COLORS.neutral;
  const alignLabel =
    bio.alignment === 'good' ? '😇 Bueno' :
      bio.alignment === 'bad' ? '😈 Malo' : '⚖️ Neutral';

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image
        source={{ uri: hero.image?.url }}
        style={styles.heroImage}
        contentFit="cover"
        transition={1000}
      />

      <View style={styles.nameRow}>
        <Text style={styles.name}>{hero.name}</Text>
        <View style={[styles.alignBadge, { backgroundColor: alignColor + '22', borderColor: alignColor + '66' }]}>
          <Text style={[styles.alignText, { color: alignColor }]}>{alignLabel}</Text>
        </View>
      </View>

      <View style={styles.content}>

        {/* Biografía */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="menu-book" size={20} color={COLORS.accent} />
            <Text style={styles.cardTitle}>Biografía</Text>
          </View>
          <InfoRow label="Nombre Real" value={bio['full-name']} />
          <InfoRow label="Alter Ego" value={bio['alter-egos']} />
          <InfoRow label="Nacimiento" value={bio['place-of-birth']} />
          <InfoRow label="1ª Aparición" value={bio['first-appearance']} />
          <InfoRow label="Editorial" value={bio['publisher']} />
          {bio.aliases?.length > 0 && (
            <InfoRow label="Alias" value={bio.aliases.join(', ')} />
          )}
        </View>

        {/* Power Stats */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="bolt" size={20} color={COLORS.accent} />
            <Text style={styles.cardTitle}>Power Stats</Text>
          </View>
          {Object.entries(stats).map(([key, val]) => (
            <StatBar key={key} label={key} value={Number(val)} />
          ))}
        </View>

        {/* Apariencia */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="face" size={20} color={COLORS.accent} />
            <Text style={styles.cardTitle}>Apariencia</Text>
          </View>
          <InfoRow label="Género" value={appearance.gender} />
          <InfoRow label="Raza" value={appearance.race} />
          <InfoRow label="Altura" value={appearance.height?.join(' / ')} />
          <InfoRow label="Peso" value={appearance.weight?.join(' / ')} />
          <InfoRow label="Ojos" value={appearance['eye-color']} />
          <InfoRow label="Cabello" value={appearance['hair-color']} />
        </View>

      </View>
    </ScrollView>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={infoStyles.row}>
      <Text style={infoStyles.label}>{label}</Text>
      <Text style={infoStyles.value}>{value || 'N/A'}</Text>
    </View>
  );
}

function StatBar({ label, value }: { label: string; value: number }) {
  const pct = isNaN(value) ? 0 : Math.min(value, 100);
  const barColor = pct >= 80 ? COLORS.good : pct >= 50 ? COLORS.neutral : COLORS.bad;
  return (
    <View style={statStyles.container}>
      <View style={statStyles.header}>
        <Text style={statStyles.label}>{label.charAt(0).toUpperCase() + label.slice(1)}</Text>
        <Text style={statStyles.value}>{isNaN(value) ? 'N/A' : value}</Text>
      </View>
      <View style={statStyles.track}>
        <View style={[statStyles.fill, { width: `${pct}%`, backgroundColor: barColor }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
  loadingText: { color: COLORS.text, marginTop: 12 },
  heroImage: { width, height: width * 1.15 },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: 0,
  },
  name: { fontSize: 26, fontWeight: 'bold', color: COLORS.text, flex: 1, marginRight: 12 },
  alignBadge: { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4, borderWidth: 1 },
  alignText: { fontSize: 12, fontWeight: '600' },
  content: { padding: 16 },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
});

const infoStyles = StyleSheet.create({
  row: { flexDirection: 'row', marginBottom: 10 },
  label: { color: COLORS.textMuted, fontSize: 13, width: 120, flexShrink: 0 },
  value: { color: COLORS.text, fontSize: 13, flex: 1 },
});

const statStyles = StyleSheet.create({
  container: { marginBottom: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  label: { color: COLORS.textSub, fontSize: 13 },
  value: { color: COLORS.text, fontSize: 13, fontWeight: 'bold' },
  track: { height: 8, backgroundColor: COLORS.surfaceLight, borderRadius: 4, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 4 },
});
