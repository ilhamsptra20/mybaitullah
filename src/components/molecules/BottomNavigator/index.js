import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {
    IconHomeActive,
    IconHomeNonActive,
    IconTawafActive,
    IconTawafNonActive,
    IconTicketActive,
    IconTicketNonActive,
    IconProfileActive,
    IconProfileNonActive,
    IconCeritaBaitullahActive,
    IconCeritaBaitullahNonactive
} from '../../../assets';

const Icon = ({label, focusIc}) => {
    switch(label){
        case 'Beranda':
            return focusIc ? <IconHomeActive width={22} height={22} /> : <IconHomeNonActive width={22} height={22} />
        case 'Tawaf Live':
            return focusIc ? <IconTawafActive width={22} height={22} /> : <IconTawafNonActive width={22} height={22} />
        case 'Cerita Baitullah':
            return focusIc ? <IconCeritaBaitullahActive width={22} height={22} /> : <IconCeritaBaitullahNonactive width={22} height={22} />
        case 'Profil':
            return focusIc ? <IconProfileActive width={22} height={22} /> : <IconProfileNonActive width={22} height={22} />
    }
}

const BottomNavigator = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                    ? options.title
                    : route.name;
        
                const isFocused = state.index === index;
        
                const onPress = () => {
                const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                });
        
                if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name, route.params);
                }
                };
        
                const onLongPress = () => {
                navigation.emit({
                    type: 'tabLongPress',
                    target: route.key,
                });
                };
        
                return (
                <TouchableOpacity
                    key={index}
                    accessibilityRole="button"
                    accessibilityState={isFocused ? { selected: true } : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarTestID}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    activeOpacity={0.7}
                    style={styles.navTab}
                >
                    {isFocused && <View style={styles.line} />}
                    <Icon label={label} focusIc={isFocused} />
                    <Text style={{color: isFocused ? '#696B6B' : '#696B6B', fontSize: 12, fontFamily: isFocused ? 'MaisonNeue-Demi' : 'MaisonNeue-Book', marginTop: 5, textAlign: 'center'}} focusIc={isFocused}>{label}</Text>
                </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default BottomNavigator

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 14,
        justifyContent: 'space-between',
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
        zIndex: 1
    },
    navTab: {
        position: 'relative',
        alignItems: 'center',
        width: '25%',
    },
    line: {
        position: 'absolute',
        top: -10.5,
        width: '70%',
        height: 4,
        backgroundColor: '#208D33',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        shadowColor: '#208D33',
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 20,
    },
    navTabText: (navTabTextColor) => (
        {
            color: navTabTextColor,
        }
    ),
    icon: {
        height: 24,
        width: 24,
    }
})