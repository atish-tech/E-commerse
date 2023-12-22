import React from 'react'
import { Card, CardBody, CardFooter } from '@chakra-ui/card';
import { Button, ButtonGroup, Divider, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router';

export const BookCart = ({data}) => {
    // console.log(data);
    const navigate = useNavigate();
    const {bookId} = useParams();
    console.log(bookId);
    return (
        <div onClick={() => {navigate(`allbook/${bookId}`)}} key={data._id}>
            <Card maxW='sm'>
                <CardBody>
                    <Image
                        src={data.thumbnailUrl}
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                        <Heading size='md'>{data.shortDescription} </Heading>
                        <Text>
                            {data.longDescription}
                        </Text>
                        <Text color='blue.600' fontSize='2xl'>
                            {data.status}
                        </Text>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    <ButtonGroup spacing='2'>
                        <Button variant='solid' colorScheme='blue'>
                            Buy now
                        </Button>
                        {/* <Button variant='ghost' colorScheme='blue'>
                            Add to cart
                        </Button> */}
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </div>
    )
}
