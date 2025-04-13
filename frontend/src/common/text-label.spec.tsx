import { render, screen } from '@testing-library/react';
import { TextLabel } from './text-label';

describe('TextLabel Component', () => {
  it('Given a text is passed, should render text correctly', () => {
    render(<TextLabel text="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('Given sx props is passed in, should apply the custom style', () => {
    render(<TextLabel text="Test" sx={{ backgroundColor: 'red' }} />);
    const textElement = screen.getByTestId('Test-label');
    expect(textElement).toHaveStyle('background-color: red');
  });

  it('Given className prop is passed in, should have the className when rendered', () => {
    render(<TextLabel text="Test" className="custom-class" />);
    const textElement = screen.getByTestId('Test-label');
    expect(textElement).toHaveClass('custom-class');
  });
});
