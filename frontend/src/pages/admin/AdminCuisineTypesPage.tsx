import { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { TableColumnsType } from 'antd';
import { Button, Col, Form, Input, message, Modal, Row, Typography } from 'antd';

import { useAddCuisineMutation, useEditCuisineMutation, useDeleteCuisineMutation, useGetCuisinesQuery } from '@/apis/admin.api';
import CustomTable from '@/components/common/CustomTable';
import UploadWidget from '@/components/common/UploadWidget';
import { useAlert } from '@/hooks/globals/useAlert.hook';
import { CuisineInput, CuisineType } from '@/types/cuisine.type';
import { cuisineTypeValidation } from '@/validations/cuisine-type.validation';

const AdminCuisineTypesPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(cuisineTypeValidation),
  });

  const { handleAlert, contextHolder } = useAlert();
  const { data: cuisines = [], isLoading: isLoadingData } = useGetCuisinesQuery();

  const [addCuisine, { isLoading: isAdding }] = useAddCuisineMutation();
  const [editCuisine, { isLoading: isEditing }] = useEditCuisineMutation();
  const [deleteCuisine] = useDeleteCuisineMutation();

  const [openAddDrawer, setOpenAddDrawer] = useState(false);
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
  const [currentCuisineId, setCurrentCuisineId] = useState<number | null>(null);

  useEffect(() => {
    if (openAddDrawer) {
      reset();
    }
  }, [openAddDrawer, reset]);

  useEffect(() => {
    if (openEditDrawer) {
      const cuisineToEdit = cuisines.find(cuisine => cuisine.id === currentCuisineId);
      if (cuisineToEdit) {
        setValue('cuisineName', cuisineToEdit.cuisineName);
        setValue('description', cuisineToEdit.description);
        setValue('cuisineImage', cuisineToEdit.cuisineImage);
      }
    }
  }, [currentCuisineId, cuisines, setValue, openEditDrawer]);

  const onSubmit = async (values: CuisineInput) => {
    try {
      if (currentCuisineId !== null) {
        const res = await editCuisine({ id: currentCuisineId, ...values });
        handleAlert(res, () => {
          setOpenEditDrawer(false);
          reset();
          setCurrentCuisineId(null);
        });
      } else {
        const res = await addCuisine(values);
        handleAlert(res, () => {
          setOpenAddDrawer(false);
          reset();
        });
      }
    } catch (error) {
      message.error('Failed to add cuisine');
    }
  };

  const columns: TableColumnsType<CuisineType> = [
    {
      title: 'Cuisine Id',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'cuisineName',
      render: (_, record) => (
        <Typography.Text className="text-nowrap">
          {record.cuisineName}
        </Typography.Text>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
  ];

  const handleEdit = (id: number) => {
    setCurrentCuisineId(id);
    setOpenEditDrawer(true);
  };

  const handleDelete = (id: number) => {
    const cuisineToDelete = cuisines.find(cuisine => cuisine.id === id);
    if (!cuisineToDelete) {
      message.error('Cuisine not found');
      return;
    }
    Modal.confirm({
      title: `Are you sure you want to delete "${cuisineToDelete.cuisineName}"?`,
      onOk: async () => {
        try {

          await deleteCuisine(id);
          message.success('Cuisine deleted successfully');
        } catch (error) {
          message.error('Failed to delete cuisine');
        }
      },
    });
  };

  const renderAddDrawerContent = () => (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label="Cuisine name"
        required
        help={errors.cuisineName?.message}
        validateStatus={errors.cuisineName ? 'error' : ''}
      >
        <Controller
          name="cuisineName"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Description"
        required
        help={errors.description?.message}
        validateStatus={errors.description ? 'error' : ''}
      >
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => <Input.TextArea rows={3} {...field} />}
        />
      </Form.Item>

      <Form.Item label="Cuisine image" required>
        <Controller
          name="cuisineImage"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="upload-image">
              {field.value ? (
                <img className="w-full" src={field.value} alt="Cuisine Image" />
              ) : null}
              <UploadWidget onChange={field.onChange} />
            </div>
          )}
        />
      </Form.Item>

      <Row justify="end" gutter={8}>
        <Col>
          <Button type="default" htmlType="reset" onClick={() => reset()}>
            Reset
          </Button>
        </Col>
        <Col>
          <Button type="primary" htmlType="submit" disabled={isAdding || isEditing}>
            Add
          </Button>
        </Col>
      </Row>

      <>{contextHolder}</>
    </Form>
  );

  const renderEditDrawerContent = () => (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label="Cuisine name"
        required
        help={errors.cuisineName?.message}
        validateStatus={errors.cuisineName ? 'error' : ''}
      >
        <Controller
          name="cuisineName"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Description"
        required
        help={errors.description?.message}
        validateStatus={errors.description ? 'error' : ''}
      >
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => <Input.TextArea rows={3} {...field} />}
        />
      </Form.Item>

      <Form.Item label="Cuisine image" required>
        <Controller
          name="cuisineImage"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="upload-image">
              {field.value ? (
                <img className="w-full" src={field.value} alt="Cuisine Image" />
              ) : null}
              <UploadWidget onChange={field.onChange} />
            </div>
          )}
        />
      </Form.Item>

      <Row justify="end" gutter={8}>
        <Col>
          <Button type="default" htmlType="reset" onClick={() => reset()}>
            Reset
          </Button>
        </Col>
        <Col>
          <Button type="primary" htmlType="submit" disabled={isAdding || isEditing}>
            Edit
          </Button>
        </Col>
      </Row>

      <>{contextHolder}</>
    </Form>
  );

  if (isLoadingData) {
    return <p>Loading...</p>;
  }

  return (
    <CustomTable
      openDrawer={openAddDrawer}
      setOpenDrawer={setOpenAddDrawer}
      addText="Add Cuisine"
      renderAddDrawerContent={renderAddDrawerContent}
      renderEditDrawerContent={renderEditDrawerContent}
      customColumns={columns}
      onDelete={handleDelete}
      onEdit={handleEdit}
      dataSource={cuisines}
      rowKey={(record) => record.id}
      openEditDrawer={openEditDrawer}
      setOpenEditDrawer={setOpenEditDrawer}
    />
  );
};

export default AdminCuisineTypesPage;
