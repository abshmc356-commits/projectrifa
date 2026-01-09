import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { COLLEGES } from '@/constants/types';
import { Image, StyleSheet } from 'react-native';

export default function TabTwoScreen() {
  const college = COLLEGES[0];
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Image source={require('@/assets/images/partial-react-logo.png')} style={styles.headerImage} />}>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">College Information</ThemedText>
      </ThemedView>

      <ThemedView>
        <ThemedText type="subtitle">{college.name}</ThemedText>
        <ThemedText>{college.address}</ThemedText>
        <ThemedText>Contact: {college.contact}</ThemedText>
        <ThemedText>Academic Year: {college.academicYear}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Admissions Open</ThemedText>
        <ThemedText>
          We are currently accepting applications for the {college.academicYear} academic session.
          Please fill out the application form in the "Home" tab to apply.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Need Help?</ThemedText>
        <ThemedText>
          If you face any issues during the application process, please contact the admission office at the number provided above.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  section: {
    marginTop: 20,
    gap: 8
  }
});
