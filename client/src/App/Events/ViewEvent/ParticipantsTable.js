import React from 'react'


export default  function ParticipantsTable({groups}) {

 return (
     <div>
        <table id='customers' style={{marginLeft: '3%'}}>
            <tr>
                <th>
                    Date
                </th>
                <th>
                    Number
                </th>
            </tr>
            {
                Object.keys(groups).map(function(keyName, keyIndex) {
                        return <tr>
                            <td>{keyName}</td>
                            <td>{groups[keyName]}</td>
                        </tr>
                })
            }
        </table>
     </div>
 );
}

