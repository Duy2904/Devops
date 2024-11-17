import { Flex, Typography } from 'antd';
import { useMemo } from 'react';
import { BlockMapType } from 'react-notion';
import { useParams } from 'react-router-dom';

import { Feature } from './components/Feature';
import useCenterSupport, { getListPageByPageContent } from './hooks/useCenterSupport';

const { Text } = Typography;
export default function Section() {
  const { sectionId } = useParams();
  const { currentPage, title } = useCenterSupport(sectionId ?? '');

  const features = useMemo(() => {
    return getListPageByPageContent(currentPage as unknown as BlockMapType);
  }, [currentPage]);

  return (
    <Flex className='w-full' justify='center'>
      <Flex vertical>
        <Text className='pb-10 font-medium text-2xl text-black/70'>{title}</Text>
        <Flex wrap='wrap'>
          {features.map((feature) => (
            <Flex className='my-2 w-1/2 min-w-[480px]' wrap='wrap' key={feature?.value?.id}>
              <Feature featureId={feature?.value?.id} />
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
