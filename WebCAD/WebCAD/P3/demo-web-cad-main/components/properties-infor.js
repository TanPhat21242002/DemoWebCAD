import "./properties-infor.css";

export default function PropertiesInfor({ properties }) {
	if (properties == null || Object.keys(properties).length == 0) {
		return <></>;
	}

	return (
		<div className="properties-infor text-white m-4">
			<table className="table-fixed border-separate border-spacing-2 border border-slate-400 w-full divide-y divide-solid text-sm">
				<thead>
					<tr>
						<th className="text-left text-lg">Properties</th>
						{/* <th className="text-right text-lg float-right pointer-events-auto">
                            <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                            </svg>
                        </th> */}
					</tr>
				</thead>
				<tbody>
					{Object.keys(properties).map((key, index) => {
						return (
							<tr key={key + "-" + index + ""}>
								<td>{properties[key].name}</td>
								<td>{properties[key].value}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
