import React from "react";
import Icon from "../../../../assets/Icon";
import {iconName} from "../../../../assets/constants";
import * as _ from "./CVStyle";

const CenterIcon = ({iKey, icon}: { iKey: React.Key | null | undefined, icon: iconName }) => {
    return (
        <_.ShowIcon key={iKey}>
            <Icon size={40} icon={icon} color={"White"}/>
        </_.ShowIcon>
    )
}

export default CenterIcon
