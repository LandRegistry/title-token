import React from "react";
import TopNav from '@govuk-react/top-nav';
import SearchBox from '@govuk-react/search-box';

const Search = (
    <SearchBox placeholder="Search"></SearchBox>
);

export default() => (
    <TopNav search={Search}/>
)