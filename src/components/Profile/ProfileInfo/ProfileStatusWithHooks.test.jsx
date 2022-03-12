import React from 'react';
import { create } from "react-test-renderer";
import { ProfileStatusOLD } from "./ProfileStatusOLD";
import { Provider } from "react-redux";
import store from "../../../redux/redux-store";

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatusOLD status="SUBSCRIBE TO BASIC"/>);
        const instance = component.getInstance();
        expect(instance.state.currentStatus).toBe("SUBSCRIBE TO BASIC");
    });
});

describe("after creation <span> should be displayed", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatusOLD status="SUBSCRIBE TO BASIC"/>);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).toBeDefined();
    });
});

describe("after creation <span> should contain correct status", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatusOLD status="SUBSCRIBE TO BASIC"/>);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("SUBSCRIBE TO BASIC");
    });
});

describe("after creation <input> should not be displayed", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatusOLD status="SUBSCRIBE TO BASIC"/>);
        const root = component.root;
        expect(() => {
            root.findByType("input")
        }).toThrowError();
    });

    test("input should be displayed in edit mode", () => {
        const component = create(<ProfileStatusOLD status="SUBSCRIBE TO BASIC"/>);
        const root = component.root;
        let button = root.findByType("button");
        button.props.onClick();
        let input = root.findByType("input")
        expect(input.props.value).toBe("SUBSCRIBE TO BASIC");
    });

    test("callback should be called", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatusOLD status="SUBSCRIBE TO BASIC" updateUserStatus={mockCallback}/>);
        const instance = component.getInstance();
        instance.props.updateUserStatus();
        expect(mockCallback.mock.calls.length).toBe(1)
    });
});