import { Button, Flex, Typography } from 'antd';
import React from 'react';

type SectionProps = {
  title?: string;
  icon?: string;
};
const { Text } = Typography;
export const Section: React.FC<SectionProps> = ({ title, icon }) => {
  return (
    <Flex
      vertical
      className='relative border-2 hover:border-[#20317b] hover:bg-white hover:shadow-xl px-8 py-4 border-black/5 border-solid rounded-xl min-w-[300px] min-h-[120px] transition-all duration-300 ease-in-out'
      justify='space-between'
      align='center'
    >
      <Text className='text-2xl'>{icon}</Text>
      <Text className='pb-4 font-semibold text-[#20317b] text-lg'>{title}</Text>
    </Flex>
  );
};
