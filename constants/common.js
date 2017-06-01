import Colors from './Colors';
import Layout from './Layout';

const Common = {
    /**
     * Typography
     * ---------------------
     * Display, h1, h2, h3 in dark and light mode
     */
    darkTitleDisplay: {
        color: Colors.darkTitleTextColor,
        marginTop: Layout.gutter.s,
        marginBottom: -(Layout.gutter.xs),
        opacity: 0.5,
        fontSize: 32,
        lineHeight: 40,
        marginLeft: Layout.gutter.l
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
    darkNameTag: {
        color: Colors.darkBodyTextColor,
        fontSize: 14,
        marginBottom: Layout.gutter.xs,
        lineHeight: 14,
        marginRight: Layout.gutter.s
    },
    darkTagTitle: {
        opacity: 0.7,
        lineHeight: 14,
        fontSize: 12,
        fontWeight: 'normal',
        color: Colors.darkTitleTextColor,
    },
    darkTagTitleDisplay: {
        fontSize: 30,
        color: Colors.darkTitleTextColor,
        opacity: 1,
        fontWeight: 'bold',
        lineHeight: 32,
        letterSpacing: -0.25,
    },
    lightTitleH1: {
        color: Colors.darkTitleTextColor,
        marginVertical: Layout.gutter.s,
        fontSize: 24,
        lineHeight: 30,
        fontWeight: 'bold'
    },
    lightTitleH2: {
        color: Colors.darkTitleTextColor,
        marginVertical: Layout.gutter.s,
        fontSize: 20,
        lineHeight: 26,
        fontWeight: 'bold'
    },
    lightTitleH3: {
        color: Colors.darkTitleTextColor,
        marginVertical: Layout.gutter.s,
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold'
    },
    lightBodyText: {
        color: Colors.darkBodyTextColor,
        marginVertical: Layout.gutter.xs,
        fontSize: 14,
        lineHeight: 19
    },
    lightTagTitle: {
        opacity: 0.8,
        lineHeight: 14,
        fontSize: 12,
        fontWeight: 'normal',
        color: Colors.lightTitleTextColor,
    },
    lightTagTitleDisplay: {
        opacity: 1,
        fontSize: 32,
        color: Colors.lightTitleTextColor,
        fontWeight: 'bold',
        lineHeight: 32
    },
    colored: {
        color: 'red',
        fontSize: 14
    },
    coloredView: {
        backgroundColor: '#CDCDCD'
    },
    coloredViewGreen: {
        backgroundColor: 'green'
    },
    coloredViewDark: {
        backgroundColor: '#920707'
    },
    /**
     * Layout positions
     * -----------------------
     * centered, aligned, left, right
     */
    centeredText: {
        textAlign: 'center',
        width: Layout.width.l
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    paddingVertical: {
        paddingVertical: Layout.gutter.s,
    },
    sectionBorder: {
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.borderColor,
    },
    /**
     * Containers
     */
    container: {
        flex: 1,
        paddingHorizontal: Layout.gutter.l,
        paddingVertical: Layout.gutter.sxs
    },
    containerText: {
        flex: 1,
        paddingLeft: Layout.gutter.m,
    },
    containerLeft: {
        flex: 1,
        paddingLeft: Layout.gutter.l
    },
    inlineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    buttonContainer: {
        width: Layout.width.xs,
        justifyContent: 'center',
        alignItems: 'center'
    },
    /**
     * Exercise component styles
     */
    exerciseThumbnail: {
        width: Layout.width.video,
        height: Layout.height.video,
        backgroundColor: Colors.borderColor,
        borderRadius: 3,
    },
    buttons: {
        backgroundColor: "whitesmoke"
    },
    imageStyle: {
        flex: 1,
        resizeMode: 'cover',
        borderRadius: 3,
    },
    /**
     * Shadows
     */
    shadowMedium: {
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
    },
    /**
     * 
     */

};

module.exports = Common;