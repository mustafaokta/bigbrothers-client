import React from 'react';
import Link from 'next/link';
import Button, { ButtonGroup } from '../../../components/bootstrap/Button';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import Icon from '../../../components/icon/Icon';
import { SubHeaderRight } from '../../../layout/SubHeader/SubHeader';

const CommonLayoutRightSubheader = () => {
	return (
		<SubHeaderRight>
			<ButtonGroup>
				<Dropdown>
					<DropdownToggle>
						<Button color='primary' isLight>
							Other Layouts
						</Button>
					</DropdownToggle>
					<DropdownMenu isAlignmentEnd>
						<DropdownItem isHeader>Header incl.</DropdownItem>
						<DropdownItem>
							<Link href='/page-layouts/header-and-subheader'>
								<Icon icon='LayoutTopPanel5' />
								Header & Subheader
							</Link>
						</DropdownItem>
						<DropdownItem>
							<Link href='/page-layouts/only-header'>
								<Icon icon='LayoutTopPanel2' />
								Only Header
							</Link>
						</DropdownItem>
						<DropdownItem isHeader>Subheader incl.</DropdownItem>
						<DropdownItem>
							<Link href='/page-layouts/header-and-subheader'>
								<Icon icon='LayoutTopPanel5' />
								Header & Subheader
							</Link>
						</DropdownItem>
						<DropdownItem>
							<Link href='/page-layouts/only-subheader'>
								<Icon icon='LayoutRightPanel2' />
								Only Subheader
							</Link>
						</DropdownItem>
						<DropdownItem isHeader>Header & Subheader excl.</DropdownItem>
						<DropdownItem>
							<Link href='/page-layouts/only-content'>
								<Icon icon='LayoutLeftPanel1' />
								Only Content
							</Link>
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</ButtonGroup>
		</SubHeaderRight>
	);
};

export default CommonLayoutRightSubheader;
