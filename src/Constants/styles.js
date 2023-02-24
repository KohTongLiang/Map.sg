export const style = {
    errorText: {
        color: 'red'
    },
    root: {
        height: 100,
        width: 100,
    },
    cardRoot: {
        display: 'flex',
        margin: 5
    },
    sliderGridList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    navFab: {
        top: 'auto',
        right: 35,
        bottom: 150,
        position: 'fixed',
    },
    searchFab: {
        top: 'auto',
        right: 35,
        bottom: 80,
        position: 'fixed',
    },
    slidePanel: {
        left: 10,
        width: '80%',
        position: 'fixed',
        bottom: '5%',
        '@media (min-width: 768px)': {
            width: "50vw"
        },
        '@media (min-width: 1200px)': {
            width: "25vw"
        }
    },
    collapseContainer: {
        display: 'flex',
    },
    appBar: {
        position: 'relative',
    },
    title: {
        flex: 1,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    turnInstruction: {
        position: 'fixed',
        width: "100%",
        zIndex: '5',
        flexGrow: 1,
        textAlign: 'center',
        padding: 5,
    },
    instr: {
        flexGrow: 1,
    },
    navBarRoot: {
        flexGorw: 1,
        top: 'auto',
        bottom: 0,
        width: '100%',
        position: 'fixed',
        zIndex: '2',
        margin: 'auto',
    },
    dialogTitle: {
        flex: 1,
    },
    form: {
        padding: 20
    },
    content: {
        flex: '1 0 auto',
    },
    controls: {
        alignItems: 'right',
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    centerText: {
        textAlign: 'center'
    },
    centeringText: {
        textAlign: 'center'
    },
    paddingTypograph:{
        padding :10 
    },
    historyStyling: {
        maxHeight: 200, 
        overflow: 'auto'
    },
    planBtn: {
        position: 'fixed',
        width: '100%',
        bottom: 0,
    },
}