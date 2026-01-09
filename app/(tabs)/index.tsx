import { HelloWave } from '@/components/hello-wave';
import { ThemedText } from '@/components/themed-text';
import { auth } from '@/config/firebase';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useApplication } from '@/hooks/useApplication';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DashboardScreen() {
  const { user } = useAuth();
  const { application, loading, startApplication, fetchApplication } = useApplication();
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth);
  };

  const handleStart = async () => {
    await startApplication();
    router.push('/application/1');
  };

  const handleContinue = () => {
    router.push('/application/1');
  };

  const handleView = () => {
    router.push('/application/1');
  };

  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'card');

  if (loading) {
    return <View style={[styles.center, { backgroundColor }]}><ActivityIndicator size="large" /></View>;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <ThemedText type="title">Welcome, {user?.email?.split('@')[0]}!</ThemedText>
            <HelloWave />
          </View>
          <TouchableOpacity onPress={() => startApplication()} style={{ padding: 8 }}>
            <Ionicons name="refresh" size={24} color={Colors.light.tint} />
          </TouchableOpacity>
        </View>

        <View style={[styles.card, { backgroundColor: cardColor, borderColor: backgroundColor }]}>
          <ThemedText type="subtitle" style={styles.cardTitle}>Application Status</ThemedText>
          <View style={[styles.statusBadge,
          application?.status === 'submitted' ? styles.statusSuccess :
            application?.status === 'draft' ? styles.statusWarning : styles.statusNeutral]}>
            <Text style={styles.statusText}>
              {application?.status ? application.status.toUpperCase().replace('_', ' ') : 'NOT STARTED'}
            </Text>
          </View>
          {application?.status === 'submitted' && (
            <Text style={styles.appNumber}>Application #: {application.officeUse?.applicationNumber}</Text>
          )}
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#FF9500', marginBottom: 20 }]}
          onPress={fetchApplication}
        >
          <Ionicons name="refresh-circle-outline" size={24} color="#fff" />
          <Text style={styles.btnText}>Reload Data</Text>
        </TouchableOpacity>

        <View style={styles.actionContainer}>
          {(!application || application.status === 'not_started') && (
            <TouchableOpacity style={[styles.button, styles.primaryBtn]} onPress={handleStart}>
              <Ionicons name="add-circle-outline" size={24} color="#fff" />
              <Text style={styles.btnText}>Start Application</Text>
            </TouchableOpacity>
          )}

          {application?.status === 'draft' && (
            <TouchableOpacity style={[styles.button, styles.primaryBtn]} onPress={handleContinue}>
              <Ionicons name="arrow-forward-circle-outline" size={24} color="#fff" />
              <Text style={styles.btnText}>Continue Application</Text>
            </TouchableOpacity>
          )}

          {application?.status === 'submitted' && (
            <TouchableOpacity style={[styles.button, styles.secondaryBtn]} onPress={handleView}>
              <Ionicons name="eye-outline" size={24} color="#fff" />
              <Text style={styles.btnText}>View Submitted Application</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30 },
  card: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#eee'
  },
  cardTitle: { marginBottom: 12 },
  statusBadge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center'
  },
  statusNeutral: { backgroundColor: '#6c757d' },
  statusWarning: { backgroundColor: '#ffc107' },
  statusSuccess: { backgroundColor: '#28a745' },
  statusText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  appNumber: { marginTop: 12, fontSize: 16, fontWeight: '600', color: '#333' },
  actionContainer: { gap: 16 },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 12,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryBtn: { backgroundColor: '#007AFF' },
  secondaryBtn: { backgroundColor: '#5856D6' },
  btnText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  logoutBtn: { marginTop: 40, padding: 16, alignItems: 'center' },
  logoutText: { color: '#dc3545', fontSize: 16, fontWeight: '500' }
});


