/**
 * Copyright 2023 Amazon.com, Inc. and its affiliates. All Rights Reserved.
 *
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *   http://aws.amazon.com/asl/
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import { AppLayout, SpaceBetween } from '@cloudscape-design/components';
import { PageHeader } from '../../components/common-components';
import { SideBarNavigation } from '../../components/SideBarNavigation';
import { ArchivesTable } from './ArchivesTable';

function Home() {
	return (
		<AppLayout
			contentHeader={<PageHeader buttons={[]} />}
			content={
				<SpaceBetween size="l">
					<ArchivesTable />
				</SpaceBetween>
			}
			navigation={<SideBarNavigation activeHref="/" />}
			toolsHide={true}
			contentType="default"
		/>
	);
}

export default Home;
