import React from 'react';
import {FaPlus as PlusIcon, FaMinus as MinusIcon, FaRegTrashAlt as TrashIcon, FaRegEdit as EditIcon, FaCheck as CheckIcon} from "react-icons/fa";
/*
    Props:
        
    State:
        
*/
const Test = ({teacher, updateTeacher, logout}) => {
    const trial = teacher.classrooms[0].students[0].goals[0].benchmarks[0].trials[0];

     const renderDocLinks = (path, name, type) => {
        const qry = `?downloadPath=${path}&filename=${name}&fileType=${type}`;
        fetch(`/api/retrievedocument${qry}`)
        .then(resp => Promise.all([resp.ok, resp.ok ? resp.blob() : resp.json(), resp.status]))
        .then(([ok, body, status]) => {
            let url = URL.createObjectURL(body, {type: type});
            const link = document.createElement('a');
            if (link.download !== undefined) {
                link.setAttribute('href', url);
                link.setAttribute("target", "_blank");
                // link.setAttribute('download', name);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });
    };

    return(
        <div>
            {
                trial.documents.map(doc => <button key={doc.id} onClick={() => renderDocLinks(doc.downloadPath, doc.filename, doc.fileType)}>get doc</button>)
            }
        </div>
    );
};

export default Test;