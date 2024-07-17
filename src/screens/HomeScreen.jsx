import { Button, Card, Checkbox, Input, List, Modal, Space, Tabs, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import useLocalStorage from 'use-local-storage';
import { IoTrashOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";


const {confirm} = Modal

const HomeScreen = () => {
    const [tasks, setTasks] = useLocalStorage('tasks', []);
    const [content, setContent] = useState('');
    const [taskSelected, setTaskSelected] = useState();


    const inpRef = useRef();
    

    useEffect(() => {
        inpRef.current?.focus();
    }, []);

    useEffect(() => {
        if (taskSelected) {
            setContent(taskSelected.content);
        } else {
            setContent('');
        }
    },[taskSelected]);
    
    const handleAddNewTask = () => {
        const items = [...tasks];

        

        if (taskSelected) {
            const newTask = {
                ...taskSelected,
                content
            }

            const index = items.findIndex(
                (element) => 
                element.content === taskSelected.content && 
                element.createdAt === taskSelected.createdAt
                );

            if (index !== -1) {
                items[index] = newTask;
            }
        }else{
            const data ={
            content,
            createdAt: Date.now(),
            isCompleted: false,
        };
            items.push(data);
            
        }
        
        setTasks(items);
        setContent('');
    };

    const handleUpdateTask = (index, isCompleted) => {
        const items = [...tasks];
        tasks[index].isCompleted = !isCompleted;

        setTasks(items);
    };

    const handleRemoveTask = (index) => {
        const items = [...tasks];
        items.splice(index, 1);

        setTasks(items);
        message.success('Remove task done!!!');
    };

    const renderListTasks = (data) => (
        <List 
                     dataSource={data} 
                     renderItem={(item, index) => ( 
                     <List.Item key={`task${index}`} extra={
                        <Space>
                            <Button 
                            disabled ={item.isCompleted}
                            onClick={() => setTaskSelected(item)}
                            icon={<FaEdit size={20} />}  
                            type='text'
                            />

                            <Button 
                             onClick={() =>confirm({
                                title: 'Comfirm',
                                content: 'Are you sure you want to remove this item ?',
                                onOk: () => handleRemoveTask(index)
                            })}
                            icon={<IoTrashOutline color='blue' size={20} />}  
                            danger 
                            type='text'
                            />
                        </Space>
                     } >
                        <List.Item.Meta 
                        title={
                        <Checkbox 
                        checked={item.isCompleted} 
                        onChange={() => 
                        handleUpdateTask(index, item.isCompleted)
                        } 
                        style={{
                            color: item.isCompleted ? '#676767' : '#212121',
                            textDecorationLine: item.isCompleted ? 'line-through' : 'none',
                            textDecorationColor: '#676767'
                        }}
                        >
                            {item.content ? item.content: ''}
                            </Checkbox>}/>
                     </List.Item> 
                     ) } 
                     />
    );

    

  return (
    <div>
        
        <div className="container mt-4" >
            <div className="col-8 offset-2" style={{width:'500px'}}>
                <div className="title"
                style={{
                    color: 'black',
                    fontSize: '40px',
                    textAlign: 'center',
                }}
                >
                    #todo
                    </div>
                <Card >
                        <Input
                        ref={inpRef}
                        width={'100%'}
                        placeholder='Content' 
                        maxLength={255}
                        value={content} 
                        onChange={(val) => setContent(val.target.value)}
                        onPressEnter={handleAddNewTask}
                        allowClear
                         />
                    <Tabs
                    items={[
                        {
                            label: 'ALL',
                            key: 1,
                            children: <>{renderListTasks(tasks)}</>,
                        },
                        {
                            label: 'Completed',
                            key: 2,
                            children: <>{renderListTasks(tasks.filter((element) => element.isCompleted))}</>,
                        },
                        {
                            label: 'Active',
                            key: 3,
                            children: <>{renderListTasks(tasks.filter((element) => !element.isCompleted))}</>,
                        },
                    ]} />
                </Card>
            </div>
        </div>
    </div>
  )
}

export default HomeScreen