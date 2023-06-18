import {Button, FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {FC, PureComponent, useEffect} from 'react';
import { NavigationContainer, StackActions, useNavigation } from '@react-navigation/native';

const PromocionesScreen: FC = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Sucursales</Text>
        <Button
            title="Ir a Home"
            onPress={() => navigation.dispatch(StackActions.popToTop())}
        />
        </SafeAreaView>
    );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F8FC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default PromocionesScreen;
