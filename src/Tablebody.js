import React from 'react';

const Tablebody = ({ data }) => {

    return (
        <tr className='hover:bg-gray-100 odd:bg-white even:bg-slate-100'>
            <td className="border px-4 py-2 whitespace-nowrap">{data.first_name}</td>
            <td className="border px-4 py-2 whitespace-nowrap">{data.last_name}</td>
            <td className="border px-4 py-2 whitespace-nowrap">{data.resume_name}</td>
            <td className="border px-4 py-2 whitespace-nowrap">{data.level}</td>
            <td className="border px-4 py-2 whitespace-nowrap">{data.profession}</td>
            <td className="border px-4 py-2 whitespace-nowrap">{data.email}</td>
            <td className="border px-4 py-2 whitespace-nowrap">{data.phone_number}</td>
            <td className="border px-4 py-2 whitespace-nowrap">{data.city}</td>
            <td className="border px-4 py-2 whitespace-nowrap">{data.country}</td>
            <td className="border px-4 py-2 whitespace-nowrap">{data.pincode}</td>
            <td className="border px-4 py-2 whitespace-nowrap">{data.github}</td>
            <td className="border px-4 py-2 whitespace-nowrap">{data.twitter}</td>
            <td className="border px-4 py-2 whitespace-nowrap">{data.linkedin}</td>
            <td className="border px-4 py-2 whitespace-nowrap">{data.portfolio_link}</td>
            <td className="border px-4 py-2 whitespace-nowrap">{data.languages}</td>
            <td className="border px-4 py-2 whitespace-nowrap">{data.summary}</td>
            <td className="border px-4 py-2 whitespace-nowrap">{data.accomplishment}</td>
            <td className="border px-4 py-2 whitespace-nowrap">
                {data.education.map((edu) => (
                    <p key={edu.education_id}>{edu.degree} in {edu.field_of_study} from {edu.school_name} {edu.school_location} from {edu.degree_start_date} to {edu.current_attend_here ? 'Present' : edu.degree_end_date}</p>
                ))}
            </td>
            <td className="border px-4 py-2 whitespace-nowrap">
                {data.work_experience.map((exp) => (
                    <p key={exp.work_id}>{exp.job_title} at {exp.company_name} {exp.company_location} from {exp.start_date} to {exp.currently_work_here ? 'Present' : exp.end_date} Description - {exp.Description}, </p>
                ))}
            </td>
            <td className="border px-4 py-2 whitespace-nowrap">
                {data.projects.map((project) => (
                    <p key={project.project_id}>{project.project_name}, Link - {project.project_link}, Description - {project.description}</p>
                ))}
            </td>
            <td className="border px-4 py-2 whitespace-nowrap">
                {data.skills.map((skill) => (
                    <p key={skill.skills_id}>Top Skills - {skill.top_technical_skills}, Technical Skills - {skill.technical_skills}, Non-Technical Skills - {skill.non_technical_skills}, Softwares - {skill.softwares}</p>
                ))}
            </td>
            <td className="border px-4 py-2 whitespace-nowrap">
                {data.certificates.map((certi) => (
                    <p key={certi.certi_id}>Name - {certi.certi_name}, Link - {certi.certi_link}, From {certi.certi_start_date} To {certi.currently_pursuing ? 'Present' : certi.certi_end_date}</p>
                ))}
            </td>
        </tr>
    );
};

export default Tablebody;
