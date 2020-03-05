import React from 'react'
import { act } from 'react-dom/test-utils';
import App from '../App'
import { mount } from 'enzyme';

describe('App', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should fetch the request', async () => {
    await act(async () => {
      await mount(<App />)
    })

    expect(fetch).toBeCalledWith('https://dog.ceo/api/breeds/image/random');
  });

  it('should show loading at first', () => {
    jest
      .spyOn(React, 'useEffect')
      .mockImplementationOnce(() => {}); 

    const comp = mount(<App />)

    expect(comp.text()).toBe('Loading...');
  });

  it('should display error if api request fail', async () => {
    fetch.mockRejectOnce();
    let comp;

    await act(async () => {
      comp = await mount(<App />);
    })
    comp.update();

    expect(comp.text()).toBe('Error');
  });

  it('should display result if api request success', async () => {
    fetch.mockResponseOnce(JSON.stringify({
      message: "https://images.dog.ceo/breeds/mastiff-tibetan/n02108551_1287.jpg",
      status: "success"
    }));
    let comp;

    await act(async () => {
      comp = await mount(<App />);
    })
    comp.update();


    expect(comp.find('img')).toHaveLength(1);
    expect(comp.find('img').prop('src'))
      .toBe('https://images.dog.ceo/breeds/mastiff-tibetan/n02108551_1287.jpg');
  });
});