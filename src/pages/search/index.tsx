import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Text } from "../../components/text";
import * as _ from './style'

const Search = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const query = Object.fromEntries(decodeURI(location.search).replace('?', '').split('&').map((v) => v.split('=')));
    console.log(query)
    useEffect(() => {
        if (query.q === undefined || query.q === '') {
            navigate(-1);
        }
    }, [])
    return (
        <>
            <_.DefaultWidth>
                <_.FlexDiv direction='column' gap={10} margin='60px 0 40px 0'>
                    <Text font="Title1" gradient={true}>{query.q}</Text>
                    <Text>검색 결과</Text>
                </_.FlexDiv>
            </_.DefaultWidth>
            <_.FlexDiv direction='column' gap={40}>
                <_.FlexDiv justify='space-between'>
                    <_.FlexDiv gap={10}>
                    </_.FlexDiv>
                </_.FlexDiv>
            </_.FlexDiv>
        </>
    )
}

export default Search;