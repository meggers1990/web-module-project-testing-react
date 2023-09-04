import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';
import mockFetchShow from '../../api/fetchShow';
jest.mock('../../api/fetchShow')



const testShow = {
    name: "",
    summary: "",
    seasons: [
        {
            id: 0,
            name: "Season One",
            episodes: []
        },
        {
            id: 1,
            name: "Season Two",
            episodes: []

        }
    ],


}

test('renders without errors with no props', async () => {
    render(<Display />)
});

test('renders Show component when the button is clicked ', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow)
    render(<Display />)
    const button = screen.getByRole('button')
    // userEvent.click(button)
    fireEvent.click(button)
    const show = await screen.findByTestId("show-container")
    expect(show).toBeInTheDocument()
});

test('renders show season options matching your data when the button is clicked', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow)
    render(<Display />)
    const button = screen.getByRole('button')
    // userEvent.click(button)
    fireEvent.click(button)

    await waitFor(() => {
        const seasonOptions = screen.queryAllByTestId('season-option')
        expect(seasonOptions).toHaveLength(2)
    })
});

test('when fetch button is presses displayFunc is called', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow)
    const displayFunc = jest.fn()
    render(<Display displayFunc={displayFunc} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)

    await waitFor(() => {
        expect(displayFunc).toHaveBeenCalled()
    })

})