import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#112131',
        borderBottomStyle: 'solid',
        alignItems: 'stretch',
    },
    detailColumn: {
        flexDirection: 'column',
        flexGrow: 9,
    },
    name: {
        fontSize: 24,
        textTransform: 'uppercase',
    },
    subtitle: {
        fontSize: 10,
        justifySelf: 'flex-end',
        textTransform: 'uppercase',
    }
});

export class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.detailColumn}>
                    <Text style={styles.name}>Folha de Pagamento - {this.props.location}</Text>
                    <Text style={styles.subtitle}>JH SERVICOS E CONSTRUCAO LTDA - 22.653.504/0001-43</Text>
                    <Text style={styles.subtitle}>Período de {this.props.PayInfo.startDate} até {this.props.PayInfo.finalDate}</Text>
                </View>
            </View>
        );
    };
}