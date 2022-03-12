import React from 'react';
import { create } from "react-test-renderer";
import Paginator from "./Paginator";

describe("Paginator component tests", () => {
    test("pages count is 11 but should be shown only 10", () => {
        const component = create(<Paginator totalItemsCount={11} pageSize={1} portionSize={10}/>);
        const root = component.root;
        let items = root.findAllByProps({className: "page-item test-item"})
        expect(items.length).toBe(10);
    });

    test("if pages count is more than 10 next button should be shown", () => {
        const component = create(<Paginator totalItemsCount={11} pageSize={1} portionSize={10}/>);
        const root = component.root;
        let button = root.findByProps({className: "page-item next"})
        expect(button).toBeTruthy()
    });
});