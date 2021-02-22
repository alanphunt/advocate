import React, {useEffect, useState} from "react";
import {FaChartPie as PieIcon} from "react-icons/fa";
import {TemplateList} from "components/templates/TemplateList"

const TrialTemplateCards = ({trackingType, setTrialTemplate}) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  useEffect(() => {
      setSelectedIndex(-1);
  }, [trackingType])

    return (
        <div className={"itemcardwrapper"}>
            <div className={"itemcardcontainer"}>
                {
                    TemplateList[trackingType].map((template, index) => {
                        return (
                            <div
                              key={`itemcard-${index}`}
                              className={`itemcard${selectedIndex === index ? " selectedcard" : ""}`}
                              onClick={() => {setSelectedIndex(index); setTrialTemplate(template.key);}}
                            >
                                <div className={"itemcardhead"}>
                                    <h2>
                                        <PieIcon className="itemcard-i"/>
                                        {template.title}
                                    </h2>
                                </div>
                                <div className={"itemcardmain"}>
                                    <p>{template.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default TrialTemplateCards;