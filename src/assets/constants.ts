export type iconName =
    "add"
    | "alam"
    | "bell"
    | "box"
    | "down"
    | "up"
    | "left"
    | "right"
    | "link"
    | "outLive"
    | "inLive"
    | "bold"
    | "bookmark-fill"
    | "bookmark"
    | "chat"
    | "check"
    | "clipboard"
    | "close"
    | "code"
    | "css"
    | "trash"
    | "eye"
    | "eye-line"
    | "file-edit"
    | "filter"
    | "folder"
    | "font-color"
    | "h-1"
    | "h-2"
    | "h-3"
    | "heart-fill"
    | "heart"
    | "html"
    | "image"
    | "italic"
    | "logout-l"
    | "logout-r"
    | "mail"
    | "medal"
    | "menu"
    | "message"
    | "more"
    | "pencil"
    | "play"
    | "refresh"
    | "save"
    | "search"
    | "send"
    | "setting"
    | "share"
    | "star-fill"
    | "star"
    | "text-line"
    | "text-box"
    | "thumbDown-fill"
    | "thumbDown"
    | "thumbUp-fill"
    | "thumbUp"
    | "user"
    | "pause"
    | "start"
    | "pnp"
    | "sv"
    | "nv"
    | "lv"
    | "full"
    | "nFull"
    | "back"
    | "front"
    | "speed"
    | "setting2"
    | "spd-up"
    | "spd-down"
    | "yt-pause"
    | "yt-play";

type icon = {
    path: string;
    viewBox: string;
}

export const IconSet: Record<iconName, icon> = {
    pause:{
        path: "M6 5h2v14H6V5Zm10 0h2v14h-2V5Z",
        viewBox: "0 0 24 24"
    },
    start:{
        path: "M19.376 12.4158 8.77735 19.4816c-.22976.1532-.5402.0911-.69338-.1387C8.02922 19.2608 8 19.1643 8 19.0656V4.93408c0-.27614.22386-.5.5-.5.09871 0 .19522.02922.27735.08398L19.376 11.5838c.2297.1532.2918.4636.1386.6934-.0366.0549-.0837.102-.1386.1386Z",
        viewBox: "0 0 24 24"
    },
    pnp:{
        path: "M21 3c.5523 0 1 .44772 1 1v7h-2V5H4v14h6v2H3c-.55228 0-1-.4477-1-1V4c0-.55228.44772-1 1-1h18Zm0 10c.5523 0 1 .4477 1 1v6c0 .5523-.4477 1-1 1h-8c-.5523 0-1-.4477-1-1v-6c0-.5523.4477-1 1-1h8Z",
        viewBox: "0 0 24 24"
    },
    sv:{
        path: "M8.88889 16.0001H5c-.55228 0-1-.4477-1-1V9.00007c0-.55229.44772-1 1-1h3.88889l5.29451-4.33186c.2137-.17486.5287-.14336.7036.07036.0731.08933.113.2012.113.31662V19.9449c0 .2762-.2239.5-.5.5-.1154 0-.2273-.0399-.3166-.113l-5.29451-4.3318Zm9.97421.591-1.422-1.422C18.3892 14.4376 19 13.2902 19 12.0001c0-1.4304-.7507-2.68534-1.8797-3.39244l1.4386-1.4386C20.0396 8.26166 21 10.0187 21 12.0001c0 1.8421-.8302 3.4904-2.1369 4.591Z",
        viewBox: "0 0 24 24"
    },
    nv:{
        path: "M5.88889 16.0001H2c-.55228 0-1-.4477-1-1V9.00007c0-.55229.44772-1 1-1h3.88889l5.29451-4.33186c.2137-.17486.5287-.14336.7036.07036.0731.08933.113.2012.113.31662V19.9449c0 .2762-.2239.5-.5.5-.1154 0-.2273-.0399-.3166-.113l-5.29451-4.3318Zm14.52531-4 3.5355 3.5355-1.4142 1.4142L19 13.4143l-3.5355 3.5355-1.4142-1.4142 3.5355-3.5355-3.5355-3.53556 1.4142-1.41422L19 10.5859l3.5355-3.53558 1.4142 1.41422-3.5355 3.53556Z",
        viewBox: "0 0 24 24"
    },
    lv:{
        path: "M2 16.0001h3.88889l5.29451 4.3318c.0893.0731.2012.113.3166.113.2761 0 .5-.2238.5-.5V4.05519c0-.11542-.0399-.22729-.113-.31662-.1749-.21372-.4899-.24522-.7036-.07036L5.88889 8.00007H2c-.55228 0-1 .44771-1 1v6.00003c0 .5523.44772 1 1 1ZM23 12c0 3.292-1.4461 6.2463-3.7378 8.2622l-1.4177-1.4178C19.7758 17.1937 21 14.7398 21 12c0-2.73984-1.2242-5.19371-3.1555-6.84443l1.4177-1.41778C21.5539 5.75368 23 8.70795 23 12Zm-5 0c0-1.9117-.894-3.61452-2.2867-4.71327l-1.4291 1.42911C15.3213 9.43855 16 10.64 16 12c0 1.36-.6787 2.5614-1.7158 3.2841l1.4291 1.4291C17.106 15.6145 18 13.9116 18 12Z",
        viewBox: "0 0 24 24"
    },
    full:{
        path: "M8 2v2.22222H4v4.44445H2V2h6ZM2 22v-6.6667h2v4.4445h4V22H2Zm20 0h-6v-2.2222h4v-4.4445h2V22Zm0-13.33333h-2V4.22222h-4V2h6v6.66667Z",
        viewBox: "0 0 24 24"
    },
    nFull:{
        path: "M18 7h4v2h-6V3h2v4ZM8 9H2V7h4V3h2v6Zm10 8v4h-2v-6h6v2h-4ZM8 15v6H6v-4H2v-2h6Z",
        viewBox: "0 0 24 24"
    },
    back:{
        path: "m8 11.3333 10.2227-6.81507c.2297-.15317.5401-.09109.6933.13868.0548.08213.084.17864.084.27735V19.0657c0 .2762-.2239.5-.5.5-.0987 0-.1952-.0292-.2773-.0839L8 12.6667V19c0 .5523-.44772 1-1 1s-1-.4477-1-1V5c0-.55228.44772-1 1-1s1 .44772 1 1v6.3333Z",
        viewBox: "0 0 24 24"
    },
    front:{
        path: "M16 12.6667 5.77735 19.4818c-.22976.1531-.5402.0911-.69338-.1387C5.02922 19.261 5 19.1645 5 19.0657V4.93426c0-.27614.22386-.5.5-.5.09871 0 .19522.02922.27735.08397L16 11.3333V5c0-.55228.4477-1 1-1s1 .44772 1 1v14c0 .5523-.4477 1-1 1s-1-.4477-1-1v-6.3333Z",
        viewBox: "0 0 24 24"
    },
    speed:{
        path: "M20 13c0 2.2091-.8954 4.2091-2.3431 5.6569l1.4142 1.4142C20.8807 18.2614 22 15.7614 22 13c0-5.52285-4.4772-10-10-10C6.47715 3 2 7.47715 2 13c0 2.7614 1.11929 5.2614 2.92893 7.0711l1.41422-1.4142C4.89543 17.2091 4 15.2091 4 13c0-4.41828 3.58172-8 8-8 4.4183 0 8 3.58172 8 8Zm-4.707-4.70703-4.5 4.50003 1.4142 1.4142 4.5-4.50002-1.4142-1.41421Z",
        viewBox: "0 0 24 24"
    },
    setting2:{
        path: "M2.1342 13.6332c-.18207-1.0959-.17606-2.1968.00088-3.2613 1.10121.0268 2.09158-.50148 2.4765-1.43075.38491-.92927.05819-2.00314-.73939-2.7629.62759-.87783 1.40178-1.66053 2.30544-2.3067.7598.79805 1.834 1.12505 2.76352.74003.92952-.38502 1.45795-1.37582 1.43085-2.47738 1.0959-.18207 2.1968-.17606 3.2613.00089-.0268 1.1012.5016 2.09157 1.4308 2.47649.9293.38492 2.0032.05819 2.7629-.73939.8779.62759 1.6606 1.40178 2.3067 2.30545-.798.75979-1.125 1.83399-.74 2.76351.385.92952 1.3758 1.45785 2.4774 1.43075.182 1.0959.176 2.1968-.0009 3.2613-1.1012-.0267-2.0916.5016-2.4765 1.4308-.3849.9293-.0582 2.0032.7394 2.7629-.6276.8779-1.4018 1.6606-2.3055 2.3067-.7598-.798-1.834-1.125-2.7635-.74s-1.4578 1.3758-1.4308 2.4774c-1.0959.1821-2.1968.1761-3.2613-.0009.0268-1.1012-.50158-2.0916-1.43085-2.4765-.92927-.3849-2.00315-.0582-2.7629.7394-.87783-.6276-1.66053-1.4018-2.3067-2.3054.79805-.7598 1.12505-1.834.74003-2.7636-.38502-.9295-1.37582-1.4578-2.47738-1.4308Zm9.8685 1.3694c1.6568 0 3-1.3432 3-3 0-1.6569-1.3432-2.99998-3-2.99998-1.6569 0-3.00009 1.34308-3.00009 2.99998 0 1.6568 1.34319 3 3.00009 3Z",
        viewBox: "0 0 24 24"
    },
    alam: {
        path: "M4 20v-6a8 8 0 0 1 16 0v6h1v2H3v-2h1Zm2 0h12v-6a6 6 0 1 0-12 0v6Zm5-18h2v3h-2V2Zm8.778 2.808 1.414 1.414-2.12 2.121-1.415-1.414 2.121-2.121ZM2.808 6.222l1.414-1.414 2.121 2.12L4.93 8.344 2.808 6.222ZM7 14a5 5 0 0 1 5-5v2a3 3 0 0 0-3 3H7Z",
        viewBox: "0 0 24 24"
    },
    add: {
        path: "M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6Z",
        viewBox: "0 0 24 24"
    },
    bell: {
        path: "M18 10c0-3.31371-2.6863-6-6-6-3.31371 0-6 2.68629-6 6v8h12v-8Zm2 8.6667.4.5333c.1657.2209.1209.5343-.1.7-.0865.0649-.1918.1-.3.1H4c-.27614 0-.5-.2239-.5-.5 0-.1082.03509-.2135.1-.3l.4-.5333V10c0-4.41828 3.58172-8 8-8 4.4183 0 8 3.58172 8 8v8.6667ZM9.5 21h5c0 1.3807-1.1193 2.5-2.5 2.5S9.5 22.3807 9.5 21Z",
        viewBox: "0 0 24 24"
    },
    box: {
        path: "M3 10H2V4.003C2 3.449 2.455 3 2.992 3h18.016A.99.99 0 0 1 22 4.003V10h-1v10.001a.996.996 0 0 1-.993.999H3.993A.995.995 0 0 1 3 20.001V10Zm16 0H5v9h14v-9ZM4 5v3h16V5H4Zm5 7h6v2H9v-2Z",
        viewBox: "0 0 24 24"
    },
    bold: {
        path: "M8 11h4.5a2.5 2.5 0 0 0 0-5H8v5Zm10 4.5a4.501 4.501 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.5 4.5 0 0 1 18 15.5ZM8 13v5h5.5a2.5 2.5 0 0 0 0-5H8Z",
        viewBox: "0 0 24 24"
    },
    "bookmark-fill": {
        path: "M5 2h14a1 1 0 0 1 1 1v19.143a.5.5 0 0 1-.766.424L12 18.03l-7.234 4.536A.5.5 0 0 1 4 22.143V3a1 1 0 0 1 1-1Z",
        viewBox: "0 0 24 24"
    },
    bookmark: {
        path: "M5 2h14a1 1 0 0 1 1 1v19.143a.5.5 0 0 1-.766.424L12 18.03l-7.234 4.536A.5.5 0 0 1 4 22.143V3a1 1 0 0 1 1-1Zm13 2H6v15.432l6-3.761 6 3.761V4Z",
        viewBox: "0 0 24 24"
    },
    chat: {
        path: "M10 3h4a8 8 0 0 1 0 16v3.5c-5-2-12-5-12-11.5a8 8 0 0 1 8-8Zm2 14h2a6 6 0 0 0 0-12h-4a6 6 0 0 0-6 6c0 3.61 2.462 5.966 8 8.48V17Z",
        viewBox: "0 0 24 24"
    },
    check: {
        path: "m10 15.172 9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414 4.95 4.95Z",
        viewBox: "0 0 24 24"
    },
    clipboard: {
        path: "M7 4V2h10v2h3.007c.548 0 .993.445.993.993v16.014a.994.994 0 0 1-.993.993H3.993A.994.994 0 0 1 3 21.007V4.993C3 4.445 3.445 4 3.993 4H7Zm0 2H5v14h14V6h-2v2H7V6Zm2-2v2h6V4H9Z",
        viewBox: "0 0 24 24"
    },
    close: {
        path: "m12 10.586 4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636l4.95 4.95Z",
        viewBox: "0 0 24 24"
    },
    css: {
        path: "M2.8 14h2.04l-.545 2.725 5.744 2.154 7.227-2.41L18.36 11H3.4l.4-2h14.96l.8-4H4.6L5 3h17l-3 15-9 3-8-3 .8-4Z",
        viewBox: "0 0 24 24"
    },
    code: {
        path: "m24 12-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12ZM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12Zm6.96 9H7.66l6.552-18h2.128L9.788 21Z",
        viewBox: "0 0 24 24"
    },
    down: {
        path: "M12.364 13.95 17.314 9l1.414 1.414-6.364 6.364L6 10.414 7.414 9l4.95 4.95Z",
        viewBox: "0 0 24 24"
    },
    eye: {
        path: "M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3Zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19Zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
        viewBox: "0 0 24 24"
    },
    "eye-line": {
        path: "M17.882 19.297A10.948 10.948 0 0 1 12 21c-5.392 0-9.878-3.88-10.819-9a10.982 10.982 0 0 1 3.34-6.066L1.392 2.808l1.415-1.415 19.799 19.8-1.415 1.414-3.309-3.31ZM5.935 7.35A8.965 8.965 0 0 0 3.223 12a9.004 9.004 0 0 0 13.201 5.838l-2.028-2.028A4.5 4.5 0 0 1 8.19 9.604L5.935 7.35Zm6.979 6.978-3.242-3.242a2.5 2.5 0 0 0 3.241 3.24l.001.002Zm7.893 2.264-1.431-1.43A8.934 8.934 0 0 0 20.777 12 9.005 9.005 0 0 0 9.552 5.338L7.974 3.76C9.221 3.27 10.58 3 12 3c5.392 0 9.878 3.88 10.819 9a10.946 10.946 0 0 1-2.012 4.592Zm-9.084-9.084a4.5 4.5 0 0 1 4.769 4.769l-4.769-4.77Z",
        viewBox: "0 0 24 24"
    },
    "file-edit": {
        path: "m21 6.757-2 2V4h-9v5H5v11h14v-2.757l2-2v5.765a.993.993 0 0 1-.993.992H3.993A1 1 0 0 1 3 20.993V8l6.003-6h10.995C20.55 2 21 2.455 21 2.992v3.765Zm.778 2.05 1.414 1.415L15.414 18l-1.416-.002.002-1.412 7.778-7.779Z",
        viewBox: "0 0 24 24"
    },
    filter: {
        path: "M10 18h4v-2h-4v2ZM3 6v2h18V6H3Zm3 7h12v-2H6v2Z",
        viewBox: "0 0 24 24"
    },
    folder: {
        path: "M12.414 5H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2ZM4 7v12h16V7H4Z",
        viewBox: "0 0 24 24"
    },
    "font-color": {
        path: "M15.246 14H8.754l-1.6 4H5l6-15h2l6 15h-2.154l-1.6-4Zm-.8-2L12 5.885 9.554 12h4.892ZM3 20h18v2H3v-2Z",
        viewBox: "0 0 24 24"
    },
    "h-1": {
        path: "M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16Zm8-12v12h-2v-9.796l-2 .536V8.67L19.5 8H21Z",
        viewBox: "0 0 24 24"
    },
    "h-2": {
        path: "M4 4v7h7V4h2v16h-2v-7H4v7H2V4h2Zm14.5 4a3.75 3.75 0 0 1 2.978 6.03l-.148.18L18.034 18H22v2h-7v-1.556l4.82-5.546a1.75 1.75 0 1 0-3.065-1.292l-.005.144h-2A3.75 3.75 0 0 1 18.5 8Z",
        viewBox: "0 0 24 24"
    },
    "h-3": {
        path: "m22 8-.002 2-2.505 2.883a3.752 3.752 0 0 1-.993 7.367 3.751 3.751 0 0 1-3.682-3.033l1.964-.382a1.75 1.75 0 1 0 .924-1.895l-1.307-1.547L19.35 10H15V8h7ZM4 4v7h7V4h2v16h-2v-7H4v7H2V4h2Z",
        viewBox: "0 0 24 24"
    },
    heart: {
        path: "M12.001 4.529a5.998 5.998 0 0 1 8.242.228 6 6 0 0 1 .236 8.236l-8.48 8.492-8.478-8.492a6 6 0 0 1 8.48-8.464Zm6.826 1.641a3.998 3.998 0 0 0-5.49-.153l-1.335 1.198-1.336-1.197a3.999 3.999 0 0 0-5.494.154 4 4 0 0 0-.192 5.451L12 18.654l7.02-7.03a4 4 0 0 0-.193-5.454Z",
        viewBox: "0 0 24 24"
    },
    html: {
        path: "m12 18.178-4.62-1.256-.328-3.544h2.27l.158 1.844 2.52.667 2.52-.667.26-2.866H6.96l-.635-6.678h11.35l-.227 2.21H8.822l.204 2.256h8.217l-.624 6.778L12 18.178ZM3 2h18l-1.623 18L12 22l-7.377-2L3 2Zm2.188 2L6.49 18.434 12 19.928l5.51-1.494L18.812 4H5.188Z",
        viewBox: "0 0 24 24"
    },
    "heart-fill": {
        path: "M12.001 4.529a5.998 5.998 0 0 1 8.242.228 6 6 0 0 1 .236 8.236l-8.48 8.492-8.478-8.492a6 6 0 0 1 8.48-8.464Z",
        viewBox: "0 0 24 24"
    },
    image: {
        path: "m5 11.1 2-2 5.5 5.5 3.5-3.5 3 3V5H5v6.1Zm0 2.829V19h3.1l2.986-2.985L7 11.929l-2 2ZM10.929 19H19v-2.071l-3-3L10.929 19ZM4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm11.5 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z",
        viewBox: "0 0 24 24"
    },
    inLive: {
        path: "M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-6c0-.67-.051-1.338-.153-2H20V5H4v3.153A13.1 13.1 0 0 0 2 8V4a1 1 0 0 1 1-1Zm10 18h-2a9 9 0 0 0-9-9v-2c6.075 0 11 4.925 11 11Zm-4 0H7a5 5 0 0 0-5-5v-2a7 7 0 0 1 7 7Zm-4 0H2v-3a3 3 0 0 1 3 3Z",
        viewBox: "0 0 24 24"
    },
    italic: {
        path: "M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15v2Z",
        viewBox: "0 0 24 24"
    },
    "logout-l": {
        path: "M4 18h2v2h12V4H6v2H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3Zm2-7h7v2H6v3l-5-4 5-4v3Z",
        viewBox: "0 0 24 24"
    },
    left: {
        path: "m10.828 12 4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414-4.95 4.95Z",
        viewBox: "0 0 24 24"
    },
    link: {
        path: "m14.828 7.757-5.656 5.657a1 1 0 1 0 1.414 1.414l5.657-5.656A3 3 0 1 0 12 4.929l-5.657 5.657a5 5 0 1 0 7.071 7.07L19.071 12l1.414 1.414-5.657 5.657a7 7 0 1 1-9.9-9.9l5.658-5.656a5 5 0 0 1 7.07 7.07L12 16.244A3 3 0 0 1 7.757 12l5.657-5.657 1.414 1.414Z",
        viewBox: "0 0 24 24"
    },
    "logout-r": {
        path: "M5 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3h-2V4H6v16h12v-2h2v3a1 1 0 0 1-1 1H5Zm13-6v-3h-7v-2h7V8l5 4-5 4Z",
        viewBox: "0 0 24 24"
    },
    mail: {
        path: "M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm17 4.238-7.928 7.1L4 7.216V19h16V7.238ZM4.511 5l7.55 6.662L19.502 5H4.511Z",
        viewBox: "0 0 24 24"
    },
    medal: {
        path: "M12 7a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm0 1.5 1.323 2.68 2.957.43-2.14 2.085.505 2.946L12 17.25l-2.645 1.39.505-2.945-2.14-2.086 2.957-.43L12 10.5ZM18 2v3l-1.363 1.138A9.935 9.935 0 0 0 13 5.049V2h5Zm-7-.001v3.05a9.935 9.935 0 0 0-3.636 1.088L6 5V2l5-.001Z",
        viewBox: "0 0 24 24"
    },
    menu: {
        path: "M3 4h18v2H3V4Zm0 7h18v2H3v-2Zm0 7h18v2H3v-2Z",
        viewBox: "0 0 24 24"
    },
    message: {
        path: "M2 8.994A5.99 5.99 0 0 1 8 3h8c3.313 0 6 2.695 6 5.994V21H8c-3.313 0-6-2.695-6-5.994V8.994ZM20 19V8.994A4.004 4.004 0 0 0 16 5H8a3.99 3.99 0 0 0-4 3.994v6.012A4.004 4.004 0 0 0 8 19h12Zm-6-8h2v2h-2v-2Zm-6 0h2v2H8v-2Z",
        viewBox: "0 0 24 24"
    },
    more: {
        path: "M12 3c-.825 0-1.5.675-1.5 1.5S11.175 6 12 6s1.5-.675 1.5-1.5S12.825 3 12 3Zm0 15c-.825 0-1.5.675-1.5 1.5S11.175 21 12 21s1.5-.675 1.5-1.5S12.825 18 12 18Zm0-7.5c-.825 0-1.5.675-1.5 1.5s.675 1.5 1.5 1.5 1.5-.675 1.5-1.5-.675-1.5-1.5-1.5Z",
        viewBox: "0 0 24 24"
    },
    outLive: {
        path: "m12 13 6 9H6l6-9Zm0 3.6L9.74 20h4.52L12 16.6Zm-1.06-6.04a1.5 1.5 0 1 1 2.044-2.194 1.5 1.5 0 0 1-2.044 2.194ZM5.281 2.783l1.415 1.415a7.5 7.5 0 0 0 0 10.606l-1.415 1.415a9.5 9.5 0 0 1 0-13.436Zm13.436 0a9.5 9.5 0 0 1 0 13.436l-1.415-1.415a7.5 7.5 0 0 0 0-10.606l1.415-1.415ZM8.11 5.611l1.414 1.414a3.5 3.5 0 0 0 0 4.95L8.11 13.389a5.5 5.5 0 0 1 0-7.778Zm7.778 0a5.5 5.5 0 0 1 0 7.778l-1.414-1.414a3.499 3.499 0 0 0 0-4.95l1.414-1.414Z",
        viewBox: "0 0 24 24"
    },
    pencil: {
        path: "m15.728 9.686-1.414-1.414L5 17.586V19h1.414l9.314-9.314Zm1.414-1.414 1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414ZM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.242 21Z",
        viewBox: "0 0 24 24"
    },
    play: {
        path: "M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM10.622 8.415l4.879 3.252a.4.4 0 0 1 0 .666l-4.88 3.252a.4.4 0 0 1-.621-.332V8.747a.4.4 0 0 1 .622-.332Z",
        viewBox: "0 0 24 24"
    },
    refresh: {
        path: "M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795Zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795Z",
        viewBox: "0 0 24 24"
    },
    right: {
        path: "m13.172 12-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414 4.95-4.95Z",
        viewBox: "0 0 24 24"
    },
    save: {
        path: "M18 19h1V6.828L17.172 5H16v4H7V5H5v14h1v-7h12v7ZM4 3h14l2.707 2.707a1 1 0 0 1 .293.707V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm4 11v5h8v-5H8Z",
        viewBox: "0 0 24 24"
    },
    setting: {
        path: "M2 12c0-.865.11-1.703.316-2.504A3 3 0 0 0 4.99 4.867a9.99 9.99 0 0 1 4.335-2.505 3 3 0 0 0 5.348 0 9.99 9.99 0 0 1 4.335 2.505 3 3 0 0 0 2.675 4.63 10.036 10.036 0 0 1 0 5.007 3 3 0 0 0-2.675 4.63 9.99 9.99 0 0 1-4.335 2.504 3 3 0 0 0-5.348 0 9.99 9.99 0 0 1-4.335-2.505 3 3 0 0 0-2.675-4.63A10.056 10.056 0 0 1 2 12Zm4.804 3c.63 1.091.81 2.346.564 3.524.408.29.842.541 1.297.75A4.993 4.993 0 0 1 12 18c1.26 0 2.438.471 3.335 1.274.455-.209.889-.46 1.297-.75A4.993 4.993 0 0 1 17.196 15a4.992 4.992 0 0 1 2.77-2.25 8.134 8.134 0 0 0 0-1.5A4.993 4.993 0 0 1 17.195 9a4.993 4.993 0 0 1-.564-3.524 7.988 7.988 0 0 0-1.297-.75A4.993 4.993 0 0 1 12 6a4.993 4.993 0 0 1-3.335-1.274 7.99 7.99 0 0 0-1.297.75A4.993 4.993 0 0 1 6.804 9a4.993 4.993 0 0 1-2.77 2.25 8.125 8.125 0 0 0 0 1.5A4.99 4.99 0 0 1 6.804 15ZM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
        viewBox: "0 0 24 24"
    },
    search: {
        path: "m18.031 16.617 4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617Zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15Z",
        viewBox: "0 0 24 24"
    },
    send: {
        path: "M1.923 9.37c-.51-.205-.504-.51.034-.689l19.086-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.475.553-.717.07L11 13 1.923 9.37Zm4.89-.2 5.636 2.255 3.04 6.082 3.546-12.41L6.812 9.17h.001Z",
        viewBox: "0 0 24 24"
    },
    share: {
        path: "m13.12 17.023-4.199-2.29a4 4 0 1 1 0-5.465l4.2-2.29a4 4 0 1 1 .959 1.755l-4.2 2.29a4.008 4.008 0 0 1 0 1.954l4.199 2.29a4 4 0 1 1-.959 1.755v.001ZM6 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm11-6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
        viewBox: "0 0 24 24"
    },
    star: {
        path: "m12 18.26-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928L12 18.26Zm0-2.292 4.247 2.377-.949-4.773 3.573-3.305-4.833-.573L12 5.275l-2.038 4.42-4.833.572 3.573 3.305-.949 4.773L12 15.968Z",
        viewBox: "0 0 24 24"
    },
    "star-fill": {
        path: "m12 18.26-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928L12 18.26Z",
        viewBox: "0 0 24 24"
    },
    "text-box": {
        path: "M5 5v14h14V5H5ZM4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm9 7v7h-2v-7H7V8h10v2h-4Z",
        viewBox: "0 0 24 24"
    },
    "text-line": {
        path: "M13 9h-2V6H5V4h14v2h-6v3Zm0 6v5h-2v-5h2ZM3 11h18v2H3v-2Z",
        viewBox: "0 0 24 24"
    },
    trash: {
        path: "M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5ZM6 6v14h12V6H6Zm3 3h2v8H9V9Zm4 0h2v8h-2V9Z",
        viewBox: "0 0 24 24"
    },
    thumbUp: {
        path: "M14.6 8H21a2 2 0 0 1 2 2v2.104a2 2 0 0 1-.15.762l-3.095 7.515a1 1 0 0 1-.925.619H2a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1h3.482a1 1 0 0 0 .817-.423L11.752.85a.5.5 0 0 1 .632-.159l1.814.907a2.5 2.5 0 0 1 1.305 2.853L14.6 8ZM7 10.588V19h11.16L21 12.104V10h-6.4a2 2 0 0 1-1.938-2.493l.903-3.548a.5.5 0 0 0-.261-.571l-.661-.33-4.71 6.672c-.25.354-.57.644-.933.858ZM5 11H3v8h2v-8Z",
        viewBox: "0 0 24 24"
    },
    thumbDown: {
        path: "M9.4 16H3a2 2 0 0 1-2-2v-2.104a2 2 0 0 1 .15-.762L4.246 3.62A1 1 0 0 1 5.17 3H22a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-3.482a1 1 0 0 0-.817.423l-5.453 7.726a.5.5 0 0 1-.632.159L9.802 22.4a2.5 2.5 0 0 1-1.305-2.853L9.4 16Zm7.6-2.588V5H5.84L3 11.896V14h6.4a2 2 0 0 1 1.938 2.493l-.903 3.548a.5.5 0 0 0 .261.571l.661.33 4.71-6.672c.25-.354.57-.644.933-.858ZM19 13h2V5h-2v8Z",
        viewBox: "0 0 24 24"
    },
    "thumbDown-fill": {
        path: "M22 15h-3V3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1Zm-5.293 1.293-6.4 6.4a.5.5 0 0 1-.654.047L8.8 22.1a1.5 1.5 0 0 1-.553-1.57L9.4 16H3a2 2 0 0 1-2-2v-2.104a2 2 0 0 1 .15-.762L4.246 3.62A1 1 0 0 1 5.17 3H16a1 1 0 0 1 1 1v11.586a1 1 0 0 1-.293.707Z",
        viewBox: "0 0 24 24"
    },
    "thumbUp-fill": {
        path: "M2 9h3v12H2a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1Zm5.293-1.293 6.4-6.4a.5.5 0 0 1 .654-.047l.853.64a1.5 1.5 0 0 1 .553 1.57L14.6 8H21a2 2 0 0 1 2 2v2.104a2 2 0 0 1-.15.762l-3.095 7.515a1 1 0 0 1-.925.619H8a1 1 0 0 1-1-1V8.414a1 1 0 0 1 .293-.707Z",
        viewBox: "0 0 24 24"
    },
    user: {
        path: "M4 22a8 8 0 0 1 16 0h-2a6 6 0 1 0-12 0H4Zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6Zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Z",
        viewBox: "0 0 24 24"
    },
    up: {
        path: "m12 11.828-4.95 4.95-1.414-1.414L12 9l6.364 6.364-1.414 1.414-4.95-4.95Z",
        viewBox: "0 0 24 24"
    },
    "spd-up": {
        path: "M 10,24 18.5,18 10,12 V 24 z M 19,12 V 24 L 27.5,18 19,12 z",
        viewBox: "0 0 36 36"
    },
    "spd-down": {
        path: "M 17,24 V 12 l -8.5,6 8.5,6 z m .5,-6 8.5,6 V 12 l -8.5,6 z",
        viewBox: "0 0 36 36"
    },
    "yt-pause": {
        path: "M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z",
        viewBox: "0 0 36 36"
    },
    "yt-play": {
        path: "M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z",
        viewBox: "0 0 36 36"
    }
}
