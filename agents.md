# 🦸 SuperHero Explorer — Expo Project Agent Instructions

## Descripción del Proyecto
Aplicación móvil construida con **Expo (React Native)** que consume la **SuperHero API**.
Cuenta con **4 tabs en el menú inferior**: Home (presentación de la app), Héroes (lista con FlatList),
API Info (documentación visual de la API) y Acerca de. Desde la lista de héroes se puede navegar
al detalle de cada uno usando Stack Navigator.

---

## 🌐 API Reference — SuperHero API

### Base URL
```
https://superheroapi.com/api/{access-token}
```

> ⚠️ La API **NO soporta GET ALL**. Los IDs deben estar guardados en un arreglo estático en el código.

### Endpoints utilizados

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/{id}` | Retorna toda la información del personaje (powerstats, biography, appearance, work, connections, image) |
| GET | `/{id}/biography` | Retorna solo la biografía del personaje |
| GET | `/{id}/image` | Retorna la URL de la imagen del personaje |
| GET | `/search/{name}` | Busca personaje por nombre, retorna su id |

### Ejemplo de respuesta `/id`
```json
{
  "response": "success",
  "id": "70",
  "name": "Batman",
  "powerstats": {
    "intelligence": "100",
    "strength": "26",
    "speed": "27",
    "durability": "50",
    "power": "47",
    "combat": "100"
  },
  "biography": {
    "full-name": "Bruce Wayne",
    "alter-egos": "No alter egos found.",
    "aliases": ["Insider", "Matches Malone"],
    "place-of-birth": "Crest Hill, Bristol Township; Gotham County",
    "first-appearance": "Detective Comics #27",
    "publisher": "DC Comics",
    "alignment": "good"
  },
  "appearance": {
    "gender": "Male",
    "race": "Human",
    "height": ["6'2", "188 cm"],
    "weight": ["210 lb", "95 kg"],
    "eye-color": "blue",
    "hair-color": "black"
  },
  "work": {
    "occupation": "Businessman",
    "base": "Batcave, Stately Wayne Manor, Gotham City"
  },
  "connections": {
    "group-affiliation": "Batman Family, Justice League...",
    "relatives": "Damian Wayne (son)..."
  },
  "image": {
    "url": "https://www.superherodb.com/pictures2/portraits/10/100/639.jpg"
  }
}
```

### Ejemplo de respuesta `/id/biography`
```json
{
  "response": "success",
  "id": "70",
  "name": "Batman",
  "full-name": "Bruce Wayne",
  "alter-egos": "No alter egos found.",
  "aliases": ["Insider", "Matches Malone"],
  "place-of-birth": "Crest Hill, Bristol Township; Gotham County",
  "first-appearance": "Detective Comics #27",
  "publisher": "DC Comics",
  "alignment": "good"
}
```

### Ejemplo de respuesta `/id/image`
```json
{
  "response": "success",
  "id": "70",
  "name": "Batman",
  "url": "https://www.superherodb.com/pictures2/portraits/10/100/639.jpg"
}
```

---

## 🏗️ Arquitectura del Proyecto

```
breaze/
├── app/
│   ├── _layout.tsx                  ← Root layout con Stack Navigator
│   ├── (tabs)/
│   │   ├── _layout.tsx              ← Tab Navigator con 4 tabs (menú inferior)
│   │   ├── index.tsx                ← Tab 1: HOME — Presentación de la app
│   │   ├── heroes.tsx               ← Tab 2: HÉROES — FlatList con los 20 héroes
│   │   ├── api-info.tsx             ← Tab 3: API INFO — Documentación visual de la API
│   │   └── about.tsx                ← Tab 4: ACERCA DE — Info del proyecto y tecnologías
│   └── hero/
│       └── [id].tsx                 ← Stack Screen: Detalle del héroe (bio + imagen + stats)
├── src/
│   ├── components/
│   │   └── HeroCard.tsx             ← Tarjeta de héroe para la FlatList
│   ├── constants/
│   │   ├── heroIds.ts               ← Array estático de los 20 IDs
│   │   └── colors.ts                ← Paleta de colores centralizada
│   └── services/
│       └── heroService.ts           ← Funciones axios para llamar a la API
├── assets/
├── .env
├── app.json
├── package.json
└── tsconfig.json
```

---

## ⚙️ Instrucciones de Construcción

### 1. Inicializar el proyecto (si no existe)
```bash
npx create-expo-app breaze --template blank-typescript
cd breaze
```

### 2. Instalar dependencias requeridas
```bash
npx expo install expo-router expo-status-bar expo-font
npm install axios
npx expo install @expo/vector-icons
npx expo install react-native-safe-area-context react-native-screens
```

> ✅ **SOLO librerías nativas de Expo o ampliamente soportadas. PROHIBIDO instalar:**
> - react-navigation (usar expo-router)
> - styled-components, nativewind (usar StyleSheet nativo)
> - react-native-vector-icons (usar @expo/vector-icons)
> - cualquier librería de animaciones de terceros

### 3. Configurar `app.json`
```json
{
  "expo": {
    "name": "SuperHero Explorer",
    "slug": "superhero-explorer",
    "scheme": "superhero",
    "version": "1.0.0",
    "orientation": "portrait",
    "plugins": ["expo-router"],
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

### 4. Configurar `.env`
```env
EXPO_PUBLIC_SUPERHERO_TOKEN=tu_access_token_aqui
EXPO_PUBLIC_BASE_URL=https://superheroapi.com/api
```

---

## 📋 IDs Estáticos de los 20 Superhéroes

```typescript
// src/constants/heroIds.ts
export const HERO_IDS: number[] = [
  70,   // Batman
  1,    // A-Bomb
  2,    // Abe Sapien
  3,    // Abin Sur
  4,    // Abomination
  5,    // Abraxas
  6,    // Absorbing Man
  7,    // Adam Monroe
  8,    // Adam Strange
  9,    // Agent Bob
  10,   // Agent Zero
  11,   // Air-Walker
  12,   // Ajax
  13,   // Alan Scott
  14,   // Alex Mercer
  15,   // Alex Woolsly
  16,   // Alfred Pennyworth
  17,   // Alien
  18,   // Allan Quatermain
  19,   // Amazo
];
```

---

## 🎨 Paleta de Colores Centralizada

```typescript
// src/constants/colors.ts
export const COLORS = {
  background: '#0f0e17',
  surface: '#1a1a2e',
  surfaceLight: '#16213e',
  accent: '#e94560',
  accentSoft: '#ff6b81',
  good: '#4ade80',
  bad: '#f87171',
  neutral: '#facc15',
  text: '#ffffff',
  textSub: '#aaaaaa',
  textMuted: '#666666',
  border: '#2a2a4a',
  headerBg: '#1a1a2e',
};
```

---

## 🗂️ Archivos Clave a Implementar

---

### `src/services/heroService.ts` — Servicio de API con Axios
```typescript
import axios from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
const TOKEN = process.env.EXPO_PUBLIC_SUPERHERO_TOKEN;

export const getHeroById = async (id: number) => {
  const res = await axios.get(`${BASE_URL}/${TOKEN}/${id}`);
  return res.data;
};

export const getAllHeroes = async (ids: number[]) => {
  const requests = ids.map((id) => getHeroById(id));
  return Promise.all(requests);
};
```

---

### `app/_layout.tsx` — Root Layout con Stack
```typescript
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="hero/[id]"
          options={{
            headerShown: true,
            title: 'Detalle del Héroe',
            headerStyle: { backgroundColor: '#1a1a2e' },
            headerTintColor: '#ffffff',
            headerBackTitle: 'Volver',
          }}
        />
      </Stack>
    </>
  );
}
```

---

### `app/(tabs)/_layout.tsx` — Tab Navigator con 4 Tabs
```typescript
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../src/constants/colors';

type IconName = React.ComponentProps<typeof MaterialIcons>['name'];

const TABS = [
  { name: 'index',    title: 'Inicio',   icon: 'home' as IconName },
  { name: 'heroes',   title: 'Héroes',   icon: 'auto-awesome' as IconName },
  { name: 'api-info', title: 'API Info', icon: 'code' as IconName },
  { name: 'about',    title: 'Acerca',   icon: 'info' as IconName },
];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 10,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        headerStyle: { backgroundColor: COLORS.headerBg },
        headerTintColor: COLORS.text,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name={tab.icon} color={color} size={size} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
```

---

### `app/(tabs)/index.tsx` — Tab HOME: Presentación de la App
```typescript
import {
  ScrollView, View, Text, StyleSheet,
  Dimensions, TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../src/constants/colors';

const { width } = Dimensions.get('window');

const FEATURES = [
  {
    icon: 'auto-awesome' as const,
    title: '20 Superhéroes',
    description: 'Explora una selección de los personajes más icónicos del universo Marvel y DC.',
    color: '#e94560',
  },
  {
    icon: 'person-search' as const,
    title: 'Biografía Detallada',
    description: 'Conoce el nombre real, origen, editorial y primera aparición de cada héroe.',
    color: '#4ade80',
  },
  {
    icon: 'bolt' as const,
    title: 'Power Stats',
    description: 'Visualiza inteligencia, fuerza, velocidad, durabilidad, poder y combate.',
    color: '#facc15',
  },
  {
    icon: 'api' as const,
    title: 'SuperHero API',
    description: 'Datos en tiempo real consumidos desde la SuperHero API con Axios.',
    color: '#60a5fa',
  },
];

const HOW_IT_WORKS = [
  'La app carga 20 héroes usando IDs estáticos en paralelo con Promise.all.',
  'Cada tarjeta muestra nombre, editorial y alineación del personaje.',
  'Al tocar un héroe, se consulta la API para traer su detalle completo.',
  'El detalle incluye biografía, imagen y estadísticas de poder con barras.',
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Banner principal */}
        <View style={styles.banner}>
          <View style={styles.bannerIcon}>
            <MaterialIcons name="shield" size={56} color={COLORS.accent} />
          </View>
          <Text style={styles.bannerTitle}>SuperHero{'\n'}Explorer</Text>
          <Text style={styles.bannerSubtitle}>
            Descubre el universo de los superhéroes. Consulta poderes, biografías e historias
            directamente desde la SuperHero API.
          </Text>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => router.push('/(tabs)/heroes')}
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
              { number: '20', label: 'Héroes' },
              { number: '6', label: 'Power Stats' },
              { number: '2', label: 'Universos' },
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
              <View style={[styles.featureIcon, { backgroundColor: f.color + '22' }]}>
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
    alignItems: 'center',
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
    backgroundColor: COLORS.accent + '22',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  bannerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 44,
    marginBottom: 12,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: COLORS.textSub,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.accent,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 28,
  },
  ctaText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.text, marginBottom: 16 },
  statsRow: { flexDirection: 'row', gap: 10 },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: { fontSize: 32, fontWeight: 'bold', color: COLORS.accent },
  statLabel: { fontSize: 12, color: COLORS.textSub, marginTop: 4 },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureText: { flex: 1 },
  featureTitle: { fontSize: 15, fontWeight: 'bold', color: COLORS.text, marginBottom: 4 },
  featureDesc: { fontSize: 13, color: COLORS.textSub, lineHeight: 20 },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 14,
  },
  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  stepText: { flex: 1, color: COLORS.textSub, fontSize: 14, lineHeight: 22, paddingTop: 4 },
});
```

---

### `app/(tabs)/heroes.tsx` — Tab HÉROES: FlatList + Buscador
```typescript
import { useEffect, useState } from 'react';
import {
  FlatList, View, Text,
  ActivityIndicator, StyleSheet, TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import HeroCard from '../../src/components/HeroCard';
import { HERO_IDS } from '../../src/constants/heroIds';
import { getAllHeroes } from '../../src/services/heroService';
import { COLORS } from '../../src/constants/colors';

export default function HeroesScreen() {
  const [heroes, setHeroes] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    getAllHeroes(HERO_IDS)
      .then((data) => { setHeroes(data); setFiltered(data); })
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
        keyExtractor={(item) => item.id}
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
            <MaterialIcons name="search-off" size={48} color={COLORS.textMuted} />
            <Text style={styles.emptyText}>No se encontraron héroes</Text>
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
  empty: { alignItems: 'center', paddingTop: 64, gap: 12 },
  emptyText: { color: COLORS.textMuted, fontSize: 16 },
});
```

---

### `app/(tabs)/api-info.tsx` — Tab API INFO: Documentación Visual
```typescript
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../src/constants/colors';

const ENDPOINTS = [
  {
    path: '/{id}',
    description: 'Retorna toda la información del personaje en un solo objeto.',
    returns: ['powerstats', 'biography', 'appearance', 'work', 'connections', 'image'],
  },
  {
    path: '/{id}/biography',
    description: 'Retorna únicamente los datos biográficos del personaje.',
    returns: ['full-name', 'alter-egos', 'aliases', 'place-of-birth', 'first-appearance', 'publisher', 'alignment'],
  },
  {
    path: '/{id}/powerstats',
    description: 'Retorna las estadísticas de poder del personaje.',
    returns: ['intelligence', 'strength', 'speed', 'durability', 'power', 'combat'],
  },
  {
    path: '/{id}/appearance',
    description: 'Retorna la descripción física del personaje.',
    returns: ['gender', 'race', 'height', 'weight', 'eye-color', 'hair-color'],
  },
  {
    path: '/{id}/work',
    description: 'Retorna la ocupación y base de operaciones.',
    returns: ['occupation', 'base'],
  },
  {
    path: '/{id}/connections',
    description: 'Retorna las afiliaciones y parientes del personaje.',
    returns: ['group-affiliation', 'relatives'],
  },
  {
    path: '/{id}/image',
    description: 'Retorna la URL de la imagen del personaje.',
    returns: ['url'],
  },
  {
    path: '/search/{name}',
    description: 'Busca un personaje por nombre y retorna su ID.',
    returns: ['id', 'name', 'results[]'],
  },
];

export default function ApiInfoScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <MaterialIcons name="api" size={36} color={COLORS.accent} />
          </View>
          <Text style={styles.headerTitle}>SuperHero API</Text>
          <Text style={styles.headerSub}>Documentación de endpoints disponibles</Text>
        </View>

        {/* Base URL */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌐 Base URL</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>https://superheroapi.com/api/{'{access-token}'}</Text>
          </View>
          <View style={styles.warningBox}>
            <MaterialIcons name="warning" size={16} color={COLORS.neutral} />
            <Text style={styles.warningText}>
              Esta API NO soporta GET ALL. Los IDs se manejan con un arreglo estático en el código.
            </Text>
          </View>
        </View>

        {/* Endpoints */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📡 Endpoints</Text>
          {ENDPOINTS.map((ep) => (
            <View key={ep.path} style={styles.endpointCard}>
              <View style={styles.endpointHeader}>
                <View style={styles.methodBadge}>
                  <Text style={styles.methodText}>GET</Text>
                </View>
                <Text style={styles.endpointPath}>{ep.path}</Text>
              </View>
              <Text style={styles.endpointDesc}>{ep.description}</Text>
              <Text style={styles.returnsLabel}>Retorna:</Text>
              <View style={styles.tagsRow}>
                {ep.returns.map((r) => (
                  <View key={r} style={styles.tag}>
                    <Text style={styles.tagText}>{r}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Ejemplo JSON */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📄 Ejemplo de Respuesta</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>
{`{
  "response": "success",
  "id": "70",
  "name": "Batman",
  "biography": {
    "full-name": "Bruce Wayne",
    "publisher": "DC Comics",
    "alignment": "good"
  },
  "powerstats": {
    "intelligence": "100",
    "combat": "100"
  },
  "image": {
    "url": "https://..."
  }
}`}
            </Text>
          </View>
        </View>

        {/* Link oficial */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => Linking.openURL('https://superheroapi.com')}
            activeOpacity={0.8}
          >
            <MaterialIcons name="open-in-new" size={18} color="#fff" />
            <Text style={styles.linkText}>Ver documentación oficial</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    alignItems: 'center',
    padding: 28,
    backgroundColor: COLORS.surface,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginBottom: 24,
  },
  headerIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.accent + '22',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: COLORS.text, marginBottom: 6 },
  headerSub: { fontSize: 13, color: COLORS.textSub },
  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text, marginBottom: 12 },
  codeBlock: {
    backgroundColor: '#0d1117',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  codeText: { color: '#79c0ff', fontFamily: 'monospace', fontSize: 12 },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.neutral + '18',
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.neutral + '44',
  },
  warningText: { color: COLORS.neutral, fontSize: 13, flex: 1, lineHeight: 20 },
  endpointCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  endpointHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  methodBadge: {
    backgroundColor: COLORS.accent,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  methodText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  endpointPath: { color: '#79c0ff', fontFamily: 'monospace', fontSize: 14, fontWeight: '600' },
  endpointDesc: { color: COLORS.textSub, fontSize: 13, lineHeight: 20, marginBottom: 8 },
  returnsLabel: { color: COLORS.textMuted, fontSize: 11, marginBottom: 6 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: {
    backgroundColor: COLORS.accent + '22',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: COLORS.accent + '44',
  },
  tagText: { color: COLORS.accent, fontSize: 11 },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.accent,
    borderRadius: 14,
    padding: 16,
  },
  linkText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
```

---

### `app/(tabs)/about.tsx` — Tab ACERCA DE
```typescript
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../src/constants/colors';

const TECHS = [
  { icon: 'phone-android' as const, name: 'Expo', version: '~52.0.0', description: 'Framework para apps React Native multiplataforma', color: '#ffffff' },
  { icon: 'route' as const, name: 'Expo Router', version: '~4.0.0', description: 'Navegación file-based con Stack y Tabs nativos', color: '#60a5fa' },
  { icon: 'http' as const, name: 'Axios', version: '^1.7.0', description: 'Cliente HTTP para consumir la SuperHero API', color: '#4ade80' },
  { icon: 'extension' as const, name: '@expo/vector-icons', version: '^14.0.0', description: 'Íconos MaterialIcons y más incluidos en Expo', color: '#facc15' },
  { icon: 'code' as const, name: 'TypeScript', version: '^5.0.0', description: 'Tipado estático para mayor robustez del código', color: '#60a5fa' },
];

const ARCH = [
  { label: 'Navegación', value: 'expo-router con Stack + Tabs (file-based routing)' },
  { label: 'HTTP Client', value: 'Axios con Promise.all para carga paralela' },
  { label: 'IDs de héroes', value: 'Arreglo estático (la API no soporta GET ALL)' },
  { label: 'Estilos', value: 'StyleSheet nativo de React Native (sin librerías externas)' },
  { label: 'Íconos', value: 'MaterialIcons de @expo/vector-icons' },
  { label: 'Responsividad', value: 'Dimensions.get("window") para tamaños dinámicos' },
];

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* App badge */}
        <View style={styles.appCard}>
          <View style={styles.appIcon}>
            <MaterialIcons name="shield" size={48} color={COLORS.accent} />
          </View>
          <Text style={styles.appName}>SuperHero Explorer</Text>
          <Text style={styles.appVersion}>Versión 1.0.0</Text>
          <Text style={styles.appDesc}>
            Proyecto académico desarrollado con Expo y arquitectura de navegación Stack + Tabs.
            Consume la SuperHero API REST para mostrar información de personajes de Marvel y DC.
          </Text>
        </View>

        {/* Tecnologías */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🛠️ Tecnologías Utilizadas</Text>
          {TECHS.map((tech) => (
            <View key={tech.name} style={styles.techRow}>
              <View style={[styles.techIcon, { backgroundColor: tech.color + '22' }]}>
                <MaterialIcons name={tech.icon} size={22} color={tech.color} />
              </View>
              <View style={styles.techInfo}>
                <View style={styles.techHeader}>
                  <Text style={styles.techName}>{tech.name}</Text>
                  <View style={styles.versionBadge}>
                    <Text style={styles.versionText}>{tech.version}</Text>
                  </View>
                </View>
                <Text style={styles.techDesc}>{tech.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Arquitectura */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏗️ Decisiones de Arquitectura</Text>
          {ARCH.map((item) => (
            <View key={item.label} style={styles.archRow}>
              <Text style={styles.archLabel}>{item.label}</Text>
              <Text style={styles.archValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Fuente de datos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📡 Fuente de Datos</Text>
          <View style={styles.sourceCard}>
            <MaterialIcons name="dataset" size={24} color={COLORS.accent} />
            <View style={{ flex: 1 }}>
              <Text style={styles.sourceTitle}>SuperHero API</Text>
              <Text style={styles.sourceUrl}>https://superheroapi.com</Text>
              <Text style={styles.sourceDesc}>
                API REST pública con información de más de 700 personajes de cómics.
                Requiere access token gratuito para consultar los endpoints.
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1, backgroundColor: COLORS.background },
  appCard: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    padding: 28,
    marginBottom: 24,
  },
  appIcon: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: COLORS.accent + '22',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  appName: { fontSize: 24, fontWeight: 'bold', color: COLORS.text, marginBottom: 4 },
  appVersion: { color: COLORS.accent, fontSize: 13, marginBottom: 12 },
  appDesc: { color: COLORS.textSub, fontSize: 13, textAlign: 'center', lineHeight: 22, paddingHorizontal: 8 },
  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text, marginBottom: 12 },
  techRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    gap: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  techIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  techInfo: { flex: 1 },
  techHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  techName: { color: COLORS.text, fontWeight: 'bold', fontSize: 14 },
  versionBadge: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  versionText: { color: COLORS.textMuted, fontSize: 11, fontFamily: 'monospace' },
  techDesc: { color: COLORS.textSub, fontSize: 12, lineHeight: 18 },
  archRow: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },
  archLabel: { color: COLORS.accent, fontSize: 11, fontWeight: 'bold', marginBottom: 2 },
  archValue: { color: COLORS.textSub, fontSize: 13, lineHeight: 20 },
  sourceCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 16,
    gap: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'flex-start',
  },
  sourceTitle: { color: COLORS.text, fontWeight: 'bold', fontSize: 15, marginBottom: 2 },
  sourceUrl: { color: '#60a5fa', fontSize: 12, marginBottom: 6 },
  sourceDesc: { color: COLORS.textSub, fontSize: 13, lineHeight: 20 },
});
```

---

### `app/hero/[id].tsx` — Stack Screen: Detalle Completo
```typescript
import { useEffect, useState } from 'react';
import {
  View, Text, Image, ScrollView,
  ActivityIndicator, StyleSheet, Dimensions,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { getHeroById } from '../../src/services/heroService';
import { COLORS } from '../../src/constants/colors';

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
      <Image source={{ uri: hero.image?.url }} style={styles.heroImage} resizeMode="cover" />

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
```

---

### `src/components/HeroCard.tsx` — Tarjeta de Héroe (FlatList)
```typescript
import { TouchableOpacity, View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../constants/colors';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 28) / 2;

interface Props { hero: any; onPress: () => void; }

export default function HeroCard({ hero, onPress }: Props) {
  const alignment = hero.biography?.alignment;
  const borderColor =
    alignment === 'good' ? COLORS.good :
    alignment === 'bad' ? COLORS.bad :
    COLORS.neutral;

  return (
    <TouchableOpacity style={[styles.card, { borderColor }]} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: hero.image?.url }} style={styles.image} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{hero.name}</Text>
        <Text style={styles.publisher} numberOfLines={1}>
          {hero.biography?.publisher || 'Unknown'}
        </Text>
        <View style={[styles.alignDot, { backgroundColor: borderColor }]} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    margin: 4,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: COLORS.surface,
    borderWidth: 2,
  },
  image: { width: '100%', height: CARD_WIDTH * 1.25 },
  info: { padding: 10 },
  name: { color: COLORS.text, fontWeight: 'bold', fontSize: 13 },
  publisher: { color: COLORS.textMuted, fontSize: 11, marginTop: 2 },
  alignDot: { width: 8, height: 8, borderRadius: 4, marginTop: 6 },
});
```

---

## ✅ Buenas Prácticas a Seguir

1. **Variables de entorno** → usar `EXPO_PUBLIC_` prefix para acceso en el cliente
2. **`Promise.all`** → carga paralela de todos los héroes, nunca secuencial
3. **`SafeAreaView`** de `react-native-safe-area-context` → evitar notch y barra de estado
4. **`Dimensions.get('window')`** → diseño responsivo en distintos tamaños de pantalla
5. **`expo-router`** → file-based routing, nunca `react-navigation` manual
6. **`keyExtractor`** → siempre en FlatList para optimizar re-renders
7. **`numberOfLines`** → truncar texto largo en tarjetas para mantener layout limpio
8. **Loading states** → `ActivityIndicator` mientras carga, nunca pantalla en blanco
9. **`try/catch`** → siempre envolver llamadas API
10. **Colores centralizados** → `src/constants/colors.ts` para consistencia visual
11. **Servicios separados** → `src/services/heroService.ts` para aislar la lógica de API
12. **`SafeAreaView` con `edges`** → pasar `edges={['top']}` en tabs para no duplicar padding

---

## 🚀 Flujo Completo de la Aplicación

```
App Launch
    │
    ▼
app/_layout.tsx  (Stack Root)
    │
    ▼
app/(tabs)/_layout.tsx  (4 Tabs inferiores)
    │
    ├── Tab 1 — index.tsx (Inicio)
    │     Banner + estadísticas + features + pasos de funcionamiento
    │     [Botón CTA] → navega a heroes.tsx
    │
    ├── Tab 2 — heroes.tsx (Héroes)
    │     Buscador + FlatList 2 columnas con HeroCard
    │     [Toca tarjeta] ──────────────────────────────────────────┐
    │                                                               │
    │                                                               ▼
    │                                                     hero/[id].tsx (Stack)
    │                                                     Imagen + Nombre + Alineación
    │                                                     Card Biografía
    │                                                     Card Power Stats (barras)
    │                                                     Card Apariencia
    │
    ├── Tab 3 — api-info.tsx (API Info)
    │     Base URL + Advertencia GET ALL
    │     Lista de 8 endpoints con tags de campos retornados
    │     Ejemplo JSON + botón a documentación oficial
    │
    └── Tab 4 — about.tsx (Acerca de)
          Badge de la app + versión
          Lista de tecnologías con versiones
          Decisiones de arquitectura
          Fuente de datos
```

---

## 📦 Dependencies Summary

```json
{
  "dependencies": {
    "expo": "~52.0.0",
    "expo-router": "~4.0.0",
    "expo-status-bar": "~2.0.0",
    "expo-font": "~13.0.0",
    "react": "18.3.2",
    "react-native": "0.76.0",
    "axios": "^1.7.0",
    "@expo/vector-icons": "^14.0.0",
    "react-native-safe-area-context": "^4.12.0",
    "react-native-screens": "^4.0.0"
  }
}
```
