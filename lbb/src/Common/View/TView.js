import React, {PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Platform,
    SafeAreaView
} from 'react-native';
import NavBarComponent from "../../shell/component/NavBarComponent";


export default class TView extends React.Component {

    constructor(state) {
        super(state);
        this.preNavBarData= this.preNavBarData.bind(this)
        this.state={
            headerData:null
        }
    }

    static propTypes: {
        NavBarComponent: PropTypes.any
    }

    static defaultProps = {
        NavBarComponent: null
    }

    preNavBarData(){
        const navigation= this.props.navigation;
        if(navigation) {
            let {params} = this.props.navigation.state

            if(params&&params.title){
                this.setState({headerData:{
                        title:params.title,
                        onNavLeftClick:params.onNavLeftClick,
                        onNavRightClick:params.onNavRightClick,
                    }})

                JXLog("params ===setData"+this.constructor.name, this.state)
            }
        }
    }


    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={{flex: 1, backgroundColor:"white"}}>
                    {this.renderNavBar()}
                    {this.renderBody()}
                </View>
                <View style={styles.fixBackground}/>
        </SafeAreaView>);
    }

    renderNavBar() {
        let headerData = this.state.headerData
        JXLog("params ==="+this.constructor.name, this.state)
        if (headerData) {

            return (<NavBarComponent title={headerData.title} onNavLeftClick={
                () => {
                    if (headerData.onNavLeftClick) {
                        headerData.onNavLeftClick();
                    } else {
                        this.props.navigation.goBack();
                    }
                }}/>)
        }
        else {
            return null
        }
    }


    renderBody() {
        return <View/>
    }


    componentWillMount(){
        this.preNavBarData();

    }


    componentDidMount() {

    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1296db'
    },
    fixBackground: {
       // backgroundColor: 'orange',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: 100,
        zIndex: -1000,
    }
});