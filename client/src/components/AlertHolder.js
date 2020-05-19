import React, { useState , useEffect} from 'react';
import ReactDOM , {unmountComponentAtNode} from 'react-dom';
import { Alert } from 'reactstrap';


function AlertHolder (props){  
    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);

    useEffect(()=>{
        if(document.getElementsByClassName('alert-holder')[0].children.length !== 0){
            setTimeout(() => {
                unmountComponentAtNode(document.getElementsByClassName('alert-holder')[0]);
            }, 5000);  
        };
    });

    return(
        <Alert color={props.type} isOpen={visible} toggle={onDismiss}>
            {props.text}
        </Alert>
    );  
};

export default AlertHolder;