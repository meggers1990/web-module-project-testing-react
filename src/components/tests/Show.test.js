import React from 'react';
import { render, fireEvent, screen, userEvent, selectOptions } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';



const testShow ={
    name:"",
    summary:"",
    seasons:[
        {
            id:0,
            name:"Season One",
            episodes:[]
        },
        {
            id:1,
            name:"Season Two",
            episodes:[]

        }
    ],
    

}

test('renders without errors', () => {
    render(<Show show={testShow} selectedSeason={"none"}/>)
 });

test('renders Loading component when prop show is null', () => {
    render(<Show show={null}/>)
    const loadingElement = screen.queryByTestId("loading-container")
    expect(loadingElement).toBeInTheDocument()
 });

test('renders same number of options seasons are passed in', () => { 
    render(<Show show={testShow} selectedSeason={"none"}/>)
    const seasonOptions =screen.queryAllByTestId('season-option')
    expect(seasonOptions).toHaveLength(2)
});

test('handleSelect is called when an season is selected', () => { });
const handleSelect= jest.fn()
render(<Show show ={testShow}  selectedSeason={"none"} handleSelect={handleSelect}/>)
const select = screen.getByLabelText(/select a season/i)
// userEvent.selectOptions(select, ['1'])
fireEvent.change(select,['1'])
expect(handleSelect).toBeCalled()

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { 
    const {rerender} = render(<Show show={testShow} selectedSeason={"none"}/>)
   let episodes = screen.queryByTestId('episodes-container')
   expect(episodes).not.toBeInTheDocument()

   rerender(<Show show={testShow} selectedSeason={1}/>)
   episodes = screen.queryByTestId('episodes-container')
   expect(episodes).toBeInTheDocument()
});