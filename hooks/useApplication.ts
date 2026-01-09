import { db } from '@/config/firebase';
import { ApplicationData } from '@/constants/types';
import { useAuth } from '@/context/AuthContext';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const useApplication = () => {
    const { user } = useAuth();
    const [application, setApplication] = useState<ApplicationData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Fetch Application
    const fetchApplication = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            const docRef = doc(db, 'applications', user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setApplication(docSnap.data() as ApplicationData);
            } else {
                // Initialize new application if none exists
                const newApp: ApplicationData = {
                    userId: user.uid,
                    status: 'not_started',
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                };
                // We don't save it to DB immediately until they click "Start", 
                // OR we can just return null and let the UI handle it. 
                // Requirement says "Dashboard must derive status ... Start if none"
                setApplication(null);
            }
        } catch (error) {
            console.error("Error fetching application:", error);
            Alert.alert("Error", "Could not load application data");
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchApplication();
    }, [fetchApplication]);

    // Start Application
    const startApplication = async () => {
        if (!user) return;
        setSaving(true);
        try {
            const newApp = {
                userId: user.uid,
                status: 'draft',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };
            await setDoc(doc(db, 'applications', user.uid), newApp, { merge: true }); // Merge just in case
            await fetchApplication();
        } catch (error) {
            console.error("Error starting application:", error);
            Alert.alert("Error", "Could not start application");
        } finally {
            setSaving(false);
        }
    };

    // Save Draft (Auto-save)
    const saveDraft = async (data: Partial<ApplicationData>) => {
        console.log("[useApplication] saveDraft called with:", data);
        if (!user) {
            console.log("[useApplication] No user found, aborting save");
            return;
        }

        // Helper to remove undefined values recursively
        const sanitizeData = (obj: any): any => {
            if (Array.isArray(obj)) {
                return obj.map(v => sanitizeData(v));
            } else if (obj !== null && typeof obj === 'object') {
                return Object.keys(obj).reduce((acc, key) => {
                    const value = sanitizeData(obj[key]);
                    if (value !== undefined) {
                        acc[key] = value;
                    }
                    return acc;
                }, {} as any);
            }
            return obj;
        };

        setSaving(true);
        try {
            console.log("[useApplication] Saving to Firestore...");
            const docRef = doc(db, 'applications', user.uid);
            const cleanData = sanitizeData(data);

            await setDoc(docRef, {
                ...cleanData,
                status: 'draft',
                updatedAt: serverTimestamp()
            }, { merge: true });
            console.log("[useApplication] Save successful");

            // Update local state without fetching to avoid flicker
            setApplication(prev => prev ? { ...prev, ...data } : null);
        } catch (error) {
            console.error("Error saving draft:", error);
            Alert.alert("Error", "Could not save draft");
        } finally {
            setSaving(false);
        }
    };

    // Submit Application
    const submitApplication = async () => {
        if (!user) return;
        setSaving(true);
        try {
            // TODO: Validate all fields before submitting? 
            // The UI should prevent reaching here if incomplete, but safe to check status.
            const docRef = doc(db, 'applications', user.uid);

            // Generate a random application number (in real app, use cloud function/transaction)
            const appNumber = `APP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

            await updateDoc(docRef, {
                status: 'submitted',
                updatedAt: serverTimestamp(),
                'officeUse.applicationNumber': appNumber,
                'officeUse.submissionDate': new Date().toISOString()
            });

            await fetchApplication();
            Alert.alert("Success", "Application submitted successfully!");
        } catch (error) {
            console.error("Error submitting:", error);
            Alert.alert("Error", "Could not submit application");
        } finally {
            setSaving(false);
        }
    };

    return {
        application,
        loading,
        saving,
        fetchApplication, // Exposed for manual reload
        startApplication,
        saveDraft,
        submitApplication
    };
};
