import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Tablebody from './Tablebody';
import { headers } from './headers';
import { CSVLink } from "react-csv";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function Table({ data }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const [currentPage, setCurrentPage] = useState(0);
    const recordsPerPage = 50;

    useEffect(() => {
        const filtered = data.filter(item => {
            const searchableFields = ['first_name', 'profession', 'phone_number', 'city', 'country', 'languages', 'skills'];
            const values = searchableFields.map(field => String(item[field]).toLowerCase());
            const joinedValues = values.join(' ');
            return joinedValues.includes(searchTerm.toLowerCase());
        });

        setFilteredData(filtered);
        setCurrentPage(0); // Reset to first page when filtering changes
    }, [searchTerm, data]);

    const offset = currentPage * recordsPerPage;
    const pageCount = Math.ceil(filteredData.length / recordsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const exportToExcel = (jsonObject, fileName) => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(jsonObject);
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
        const s2ab = (s) => {
            const buf = new ArrayBuffer(s.length);
            const view = new Uint8Array(buf);
            for (let i = 0; i < s.length; i++) {
                view[i] = s.charCodeAt(i) & 0xff;
            }
            return buf;
        };
        saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), `${fileName}.xlsx`);
    };

    function downloadExcel() {
        const now = new Date();
        const formattedDateTime = now.toLocaleString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        });
        exportToExcel(filteredData, formattedDateTime)
    }

    return (
        <div className="flex flex-col px-6 py-12 bg-slate-200 rounded-xl">
            <input
                className='w-[40%] border rounded-lg py-2 px-2 focus:outline-none focus:border-slate-200 focus:ring-1 focus:slate-grey-100'
                type="text"
                placeholder="Search or Filter in First Name, Profession, Phone Number, City, Country, Languages, Skills"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <div className="overflow-x-auto mt-3 rounded-lg">
                <table className="w-auto border rounded-lg">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 whitespace-nowrap">First Name</th>
                            <th className="px-4 py-2 whitespace-nowrap">Last Name</th>
                            <th className="px-4 py-2 whitespace-nowrap">Resume Name</th>
                            <th className="px-4 py-2 whitespace-nowrap">Level</th>
                            <th className="px-4 py-2 whitespace-nowrap">Profession</th>
                            <th className="px-4 py-2 whitespace-nowrap">Email</th>
                            <th className="px-4 py-2 whitespace-nowrap">Phone</th>
                            <th className="px-4 py-2 whitespace-nowrap">City</th>
                            <th className="px-4 py-2 whitespace-nowrap">Country</th>
                            <th className="px-4 py-2 whitespace-nowrap">Pincode</th>
                            <th className="px-4 py-2 whitespace-nowrap">Github</th>
                            <th className="px-4 py-2 whitespace-nowrap">Twitter</th>
                            <th className="px-4 py-2 whitespace-nowrap">LinkedIn</th>
                            <th className="px-4 py-2 whitespace-nowrap">Portfolio</th>
                            <th className="px-4 py-2 whitespace-nowrap">Languages</th>
                            <th className="px-4 py-2 whitespace-nowrap">Summary</th>
                            <th className="px-4 py-2 whitespace-nowrap">Accomplishment</th>
                            <th className="px-4 py-2 whitespace-nowrap">Education</th>
                            <th className="px-4 py-2 whitespace-nowrap">Work Experience</th>
                            <th className="px-4 py-2 whitespace-nowrap">Projects</th>
                            <th className="px-4 py-2 whitespace-nowrap">Skills</th>
                            <th className="px-4 py-2 whitespace-nowrap">Certificates</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {
                            filteredData.length
                                ?
                                filteredData.map((person, index) => (
                                    <Tablebody data={person} key={index} />
                                ))
                                :
                                <tr className='w-full h-96'>
                                    <td colSpan={22} className='w-full'>No record found</td>
                                </tr>

                        }
                    </tbody>
                </table>
            </div>
            <div colSpan={22} className="flex justify-end gap-6 pt-6">
                <CSVLink data={filteredData} headers={headers} className=' py-2 px-4 bg-slate-500 text-white font-semibold rounded-lg'>Download CSV</CSVLink>
                <button className='py-2 px-4 bg-slate-500 text-white font-semibold rounded-lg' onClick={downloadExcel}>Download as Excel</button>
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination flex gap-2'}
                    activeClassName={'active'}
                    pageClassName={'rounded-full p-2 bg-slate-500 text-white font-semibold align-middle w-[40px] h-[40px]'}
                    previousClassName={'rounded-full bg-slate-500 text-white font-semibold p-2 align-middle w-[40px] h-[40px]'}
                    nextClassName={'rounded-full p-2 bg-slate-500 text-white font-semibold align-middle w-[40px] h-[40px]'}
                />

            </div>
        </div>
    )
}

export default Table;