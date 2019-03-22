import React from 'react';
import { Page, Text, View, Document, StyleSheet, BlobProvider, Note } from '@react-pdf/renderer';
import FlatButton from '@material-ui/core/Button';
import GetApp from '@material-ui/icons/GetApp';
import { Header } from './Header';
import { Pay } from './Pay';


const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  text: {
    padding: 5
  },
  pageNumbers: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center'
  },

});


class PDF extends React.Component {
  constructor(props) {
    super(props);
  }
  state = { PayInfo: [], Locations: [] };

  async componentWillMount() {
    let self = this;
    const URL_TO_FETCH = 'http://127.0.0.1:3000/Payroll/extra/' + this.props.id;
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJUUTFSREV3TlRaRE1rTkZPRU16TWpSRk9EVTNOelV3TlRCRE5FSXpOemRFUlRnM1FVSXpOUSJ9.eyJodHRwczovL2NldHRlY25vbG9naWEuY29tL2VtYWlsIjoiYWRtaW5AamguY29tIiwiaHR0cHM6Ly9jZXR0ZWNub2xvZ2lhLmNvbS9wcm9maWxlIjoiYWRtaW4iLCJodHRwczovL2NldHRlY25vbG9naWEuY29tL2NvbXBhbnlJZCI6MjIsImlzcyI6Imh0dHBzOi8vY2V0dGVjbm9sb2dpYS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWM2Mjg2YzBmYWZjMDY3YWRhYTc3NjExIiwiYXVkIjoiaHR0cHM6Ly9wcmVzZW5jZS1jaGVjay1hcGkuY29tIiwiaWF0IjoxNTUzMTEwOTk0LCJleHAiOjE1NTMxOTczOTQsImF6cCI6InZxYnBiR2NuV3I1eU40TUxRUmprdDdEV1dwQjhtb0ZiIiwiZ3R5IjoicGFzc3dvcmQifQ.OaQEEXEKoncvBfGXkGbTj1j61BZcHkLUJ67otyo-fssI4NkwrE0VgVQKd8O-Pf5oPrOExQKpuYImC3fX9JBFxSp8Ra37T0ZQYcV3HBeIwGKYMiIShqUSAu_8f_UgxPOBGURBwncfyJZW4k-PcSeI_5FHBQumq2mm_XvinAomXCbM3HmE2BGsdh1N8smKAxSke0UaM_FTNNSEc6aSXjhSztakmykRlMIJgXrk-YOnU2fLU3xU1rPbO312j_3FmS18pHFTlACYlCk7HkH6f043X3j0hYPF32MxzuZliuX7VWf96OcHNYtyIVp-2mtnAZLFXlaT7hF4mHkw8foN_iE8AA'
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.set('Authorization', `Bearer ${token}`);
    await fetch(URL_TO_FETCH, {
      method: 'get', // opcional 
      headers: headers
    }, { mode: 'cors' })
      .then((response) => {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('role');
        }
        let PayInfo, Locations
        response.json().then(function (data) {
          PayInfo = data;
          Locations = data.locations;
          self.setState({ PayInfo, Locations });
        });
      })
  }


  render() {
    const { PayInfo, Locations } = this.state;
    const MyDoc = (<Document>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.section} wrap>
          {Locations.map((location, index) => {
            return (
              <>
                {index !== 0 ?
                  <View style={styles.section} break>
                    <Text style={styles.text}>--------------------------------------------</Text>
                    <Header PayInfo={PayInfo} location={location.name} />
                    {location.Employees.map(Employee => {
                      return (
                        <Pay employee={Employee.Employee} />
                      );
                    })}
                  </View> : <View style={styles.section}>
                    <Header PayInfo={PayInfo} location={location.name} />
                    {location.Employees.map(Employee => {
                      return (
                        <Pay employee={Employee.Employee} />
                      );
                    })}
                  </View>
                }
              </>
            )
          }
          )}
        </View>

      </Page>
    </Document>)
    return (
      <div>
        {this.state.Locations.length === 0 ? null :
          <BlobProvider document={MyDoc}>
            {({ blob, url, loading, error }) => {
              // Do whatever you need with blob here
              return this.state.Locations.length === 0 ? null : <a download="somename.pdf" href={url}><FlatButton color="primary"><GetApp /> Exportar</FlatButton></a>
            }}
          </BlobProvider>
        }
      </div>
    );
  };

}
export default PDF;
