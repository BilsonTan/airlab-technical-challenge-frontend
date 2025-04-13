import { render, screen } from "@testing-library/react";
import { Row } from "./row";

describe('Row Component', () => {
    it('Given a child component, should render it correctly with default styles', () => {
        render(<Row><div>Test</div></Row>);
        expect(screen.getByText('Test')).toBeInTheDocument();
        const rowElement = screen.getByTestId('common-row');
        expect(rowElement).toHaveStyle('display: flex');
        expect(rowElement).toHaveStyle('flex-direction: row');
        expect(rowElement).toHaveStyle('gap: 20px');
        expect(rowElement).toHaveStyle('justify-content: center');
        expect(rowElement).toHaveStyle('align-items: center');
    });

    it('Given sx props is passed in, should apply the custom style', () => {
        render(<Row sx={{ backgroundColor: 'red' }}><div>Test</div></Row>);
        const rowElement = screen.getByTestId('common-row');
        expect(rowElement).toHaveStyle('background-color: red');
    });

    it('Given className prop is passed in, should have the className when rendered', () => {
        render(<Row className="custom-class"><div>Test</div></Row>);
        const rowElement = screen.getByTestId('custom-class-row');
        expect(rowElement).toHaveClass('custom-class');
    });
    it('Given children, should render them multiple correctly', () => {
        render(
            <Row>
                <div>Child 1</div>
                <div>Child 2</div>
            </Row>
        );
        expect(screen.getByText('Child 1')).toBeInTheDocument();
        expect(screen.getByText('Child 2')).toBeInTheDocument();
    });
});