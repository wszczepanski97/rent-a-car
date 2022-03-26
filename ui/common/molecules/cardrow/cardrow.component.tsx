const CardRow: React.FC<CardRowProps> = ({ className, children }) => (
    <div className={className}>
        {children}
    </div>
);

type CardRowProps = {
    className?: string;
}

export default CardRow;