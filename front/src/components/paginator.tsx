import { useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Text } from 'react-native';
import Physics from '../constants/physics';
import Colors from '../constants/colors';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
    current: number;
    total: number;
    limit: number;
    neighbours: number;
    onPageChange: (page: number) => void;
}

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

export default function KPaginator(props: Props) {
    const neighbours = props.neighbours;
    const [current, setCurrent] = useState(props.current);

    const range = (from: number, to: number, step = 1): Array<any> => {
        let i = from;
        const range = [];

        while (i <= to) {
            range.push(i);
            i += step;
        }

        return range;
    }

    const fetchPageNumbers = () => {
        const totalPages = Math.ceil(props.total / props.limit);
        const currentPage = current;
        const pageNeighbours = neighbours;

        /**
         * totalNumbers: the total page numbers to show on the control
         * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
         */
        const totalNumbers = (pageNeighbours * 2) + 3;
        const totalBlocks = totalNumbers + 2;

        if (totalPages > totalBlocks) {
            const startPage = Math.max(2, currentPage - pageNeighbours);
            const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
            let pages = range(startPage, endPage);

            /**
             * hasLeftSpill: has hidden pages to the left
             * hasRightSpill: has hidden pages to the right
             * spillOffset: number of hidden pages either to the left or to the right
             */
            const hasLeftSpill = startPage > 2;
            const hasRightSpill = (totalPages - endPage) > 1;
            const spillOffset = totalNumbers - (pages.length + 1);

            switch (true) {
                // handle: (1) < {5 6} [7] {8 9} (10)
                case (hasLeftSpill && !hasRightSpill): {
                    const extraPages = range(startPage - spillOffset, startPage - 1);
                    pages = [LEFT_PAGE, ...extraPages, ...pages];
                    break;
                }

                // handle: (1) {2 3} [4] {5 6} > (10)
                case (!hasLeftSpill && hasRightSpill): {
                    const extraPages = range(endPage + 1, endPage + spillOffset);
                    pages = [...pages, ...extraPages, RIGHT_PAGE];
                    break;
                }

                // handle: (1) < {4 5} [6] {7 8} > (10)
                case (hasLeftSpill && hasRightSpill):
                default: {
                    pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
                    break;
                }
            }

            return [1, ...pages, totalPages];
        }

        return range(1, totalPages);
    }

    const gotoPage = (page: number) => {
        const currentPage = Math.max(0, Math.min(page, props.total));
        setCurrent(currentPage);
    }

    const handleMoveLeft = () => {
        gotoPage(current - (neighbours * 2) - 1);
    }

    const handleMoveRight = () => {
        gotoPage(current + (neighbours * 2) + 1);
    }

    const pages = fetchPageNumbers();

    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.wrapper}>
            {pages.map((page, index) => {
                let pad, onPress;
                if (page === LEFT_PAGE) {
                    pad = (
                        <Ionicons name="chevron-back-circle" size={Physics.icon.medium} color={Colors.light.primaryDark} />
                    );
                    onPress = handleMoveLeft;
                } else if (page === RIGHT_PAGE) {
                    pad = (
                        <Ionicons name="chevron-forward-circle" size={Physics.icon.medium} color={Colors.light.primaryDark} />
                    );
                    onPress = handleMoveRight;
                } else {
                    pad = (
                        <Text style={{ ...styles.text, ...(page === props.current ? styles.currentText : {}) }}>
                            {page}
                        </Text>
                    );
                    onPress = () => props.onPageChange(page);
                }

                return (
                    <Pressable key={index} style={{ ...styles.pad, ...(page === props.current ? styles.current : {}) }} onPress={onPress}>
                        {pad}
                    </Pressable>
                );

            })}
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: Physics.gap.medium,
    },
    pad: {
        padding: Physics.padding.medium,
        margin: Physics.gap.medium,
        borderRadius: Physics.borderRadius.medium,
        backgroundColor: Colors.light.canvas,
        ...Physics.shadow,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    current: {
        backgroundColor: Colors.light.secondaryDark,
    },
    text: {
        fontWeight: 'bold',
    },
    currentText: {
        color: 'white'
    },
});
