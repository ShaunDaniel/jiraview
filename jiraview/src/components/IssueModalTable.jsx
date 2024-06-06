import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Tag,
    TagLabel,
    Avatar,
} from '@chakra-ui/react'

function IssueModalTable({ reporter, assignee }) {

    return (
        <Table variant="simple" h={'fit-content'}>
            <Thead>
                <Tr>
                    <Th>Reporter</Th>
                    <Th>Assignee</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>
                        <Tag px={3} py={1} borderRadius={'full'}>

                            <Avatar
                                size='xs'
                                name={reporter.displayName}
                                ml={-1}
                                mr={2}
                            />
                            <TagLabel>{reporter.displayName}</TagLabel>
                        </Tag>
                    </Td>
                    <Td>
                            <Tag px={3} py={1} borderRadius={'full'}>
                                <Avatar
                                    size='xs'
                                    name={assignee ? assignee.displayName : ''}
                                    ml={-1}
                                    mr={2}
                                />
                                <TagLabel>{assignee ? assignee.displayName : 'Unassigned'}</TagLabel>
                            </Tag>
                    </Td>
                </Tr>
            </Tbody>
        </Table>
    )
}

export default IssueModalTable
