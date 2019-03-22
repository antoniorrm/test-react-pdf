import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#112131',
        borderBottomStyle: 'solid',
        alignItems: 'stretch',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    detailColumn: {
        flexDirection: 'column',
        flexGrow: 3,
    },
    subtitle: {
        fontSize: 10,
        justifySelf: 'flex-end',
        textTransform: 'uppercase',
        paddingTop: 5,
    },
    paySub: {
        fontSize: 10,
        justifySelf: 'flex-end',
        paddingTop: 5,
    },
});
const format = (number) => {
    let salary = parseFloat(number)
    salary = salary.toFixed(2)
    salary = "" + (salary)
    salary = salary.replace(".", ",")
    console.log(salary)
    return salary
}

export class Pay extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View wrap={false}>
                <View style={styles.container} wrap={false}>
                    <View style={styles.detailColumn}>
                        <Text style={styles.paySub}>{this.props.employee.registry} - {this.props.employee.name}</Text>
                        <Text style={styles.paySub}>Cargo - {this.props.employee.roleName}</Text>
                        <Text style={styles.paySub}>Admissão - {this.props.employee.admissionDate}</Text>
                    </View>
                    <View style={styles.detailColumn}>
                        {this.props.employee.events.map(event => {
                            return (
                                <>
                                    <Text style={styles.paySub}> {event.event} - R$ {format(event.proceeds)}</Text>
                                </>
                            );
                        })}
                        <Text style={styles.subtitle}>Liquido a receber: {format(this.props.employee.totalToReceive)}</Text>
                    </View>
                </View>
                <View style={styles.footer} wrap={false}>
                    <View style={styles.detailColumn}>
                        <Text style={styles.subtitle}></Text>
                        <Text style={styles.subtitle}>Data ___ / ___ /______</Text>
                    </View>
                    <View style={styles.detailColumn}>
                        <Text style={styles.subtitle}></Text>
                        <Text style={styles.subtitle}> Assinatura _________________________________________</Text>
                    </View>
                </View>
            </View>
        );
    };
}