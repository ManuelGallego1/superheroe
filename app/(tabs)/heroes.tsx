import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeroCard from '../../src/components/HeroCard';
import { COLORS } from '../../src/constants/colors';
import { HERO_IDS } from '../../src/constants/heroIds';
import { getAllHeroes } from '../../src/services/heroService';

export default function HeroesScreen() {
  const [heroes, setHeroes] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    getAllHeroes(HERO_IDS)
      .then((data) => {
        const valid = data.filter((h) => h.response === 'success');
        setHeroes(valid);
        setFiltered(valid);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFiltered(
      search.trim() === ''
        ? heroes
        : heroes.filter((h) =>
          h.name.toLowerCase().includes(search.toLowerCase())
        )
    );
  }, [search, heroes]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={styles.loadingText}>Cargando héroes...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color={COLORS.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar héroe..."
          placeholderTextColor={COLORS.textMuted}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <MaterialIcons name="close" size={18} color={COLORS.textMuted} onPress={() => setSearch('')} />
        )}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <HeroCard hero={item} onPress={() => router.push(`/hero/${item.id}`)} />
        )}
        numColumns={2}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.count}>{filtered.length} héroes encontrados</Text>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialIcons name="warning" size={48} color={COLORS.neutral} />
            <Text style={styles.emptyText}>No se encontraron héroes.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
  loadingText: { color: COLORS.text, marginTop: 12, fontSize: 16 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.surface,
    margin: 12,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: { flex: 1, color: COLORS.text, fontSize: 15 },
  list: { paddingHorizontal: 8, paddingBottom: 24 },
  count: { color: COLORS.textMuted, fontSize: 12, paddingHorizontal: 4, marginBottom: 8 },
  empty: { alignItems: 'center', paddingTop: 64, gap: 12, paddingHorizontal: 32 },
  emptyText: { color: COLORS.text, fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  subEmptyText: { color: COLORS.textSub, fontSize: 14, textAlign: 'center', lineHeight: 20 },
});
