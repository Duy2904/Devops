import { Flex } from 'antd';

interface SearchBlockProps {
    children: JSX.Element | null;
}

const SearchBlock: React.FC<SearchBlockProps> = ({ children }) => {
    return (
        <Flex className="flex-wrap mb-4" align="center" justify="space-between">
            {children}
        </Flex>
    );
};

export default SearchBlock;
