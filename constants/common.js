import Colors from './Colors';
import Layout from './Layout';

const Common = {
    darkTitleDisplay: {
        color: Colors.darkTitleTextColor,
        marginVertical: Layout.gutter.s,
        opacity: 0.5,
        fontSize: 32,
        lineHeight: 40,
        marginLeft: Layout.gutter.m + Layout.gutter.s
    },
    darkTitleH1: {
        color: Colors.darkTitleTextColor,
        marginVertical: Layout.gutter.s,
        fontSize: 24,
        lineHeight: 30,
        fontWeight: 'bold'
    },
    darkTitleH2: {
        color: Colors.darkTitleTextColor,
        marginVertical: Layout.gutter.s,
        fontSize: 20,
        lineHeight: 26,
        fontWeight: 'bold'
    },
    darkTitleH3: {
        color: Colors.darkTitleTextColor,
        marginVertical: Layout.gutter.s,
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold'
    },
    darkBodyText: {
        color: Colors.darkBodyTextColor,
        marginVertical: Layout.gutter.xs,
        fontSize: 14,
        lineHeight: 19
    },
    centeredText: {
        textAlign: 'center',
        width: Layout.width.l
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        paddingVertical: Layout.gutter.s,
        paddingHorizontal: Layout.gutter.m
    },
    sectionContainer: {
        flex: 1,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.borderColor,
        paddingHorizontal: Layout.gutter.m + Layout.gutter.s,
        paddingVertical: Layout.gutter.xs + Layout.gutter.s
    },
    buttons: {
        backgroundColor: "whitesmoke"
    },

};

module.exports = Common;