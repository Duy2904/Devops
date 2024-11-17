import { Form, FormInstance, Upload, UploadFile, UploadProps } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useCreateTourMedias, useDeleteTourMedia } from '@fragments/Tour/hooks/useTourMedias';

import { AnyObject } from 'antd/es/_util/type';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { RcFile } from 'antd/es/upload';
import { TourScheduleDto } from '@sdk/tour-operations';
import { TourType } from '@src/types/TypeEnum';
import i18n from '@src/i18n';
import { toastSuccess } from '@components/ui/Toast/Toast';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { useTourFormStore } from '@store/tourFormStore';
import { useTourScheduleStore } from '@store/tourScheduleStore';

interface MediaTourProps {
    files?: UploadFile[];
    uploadFileForm?: FormInstance;
    tourType?: TourType;
    tourData?: AnyObject;
}

export const MediaTour: React.FC<MediaTourProps> = props => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const hasPermission = useHasAnyPermission([
        MyPermissions.TourFitCreate,
        MyPermissions.TourFitUpdate,
        MyPermissions.TourGitCreate,
        MyPermissions.TourGitUpdate,
    ]);

    const {
        mediaList,
        tourScheduleFormStatus,
        actions: { setMediaList, setTourScheduleFormStatus },
    } = useTourFormStore(state => state);

    const { tourSchedule } = useTourScheduleStore(state => state);

    const { mutateAsync: deleteTourMedia } = useDeleteTourMedia(props.tourType!);

    const { mutateAsync: createTourMedias } = useCreateTourMedias();

    const _props: UploadProps = {
        onRemove: file => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
            setMediaList(newFileList);
        },
        beforeUpload: (_, fileListData: RcFile[]) => {
            setFileList([...fileList, ...fileListData]);
            setMediaList([...fileList, ...fileListData]);
            return false;
        },
        multiple: true,
        fileList,
    };

    const mapFileList = (data: TourScheduleDto): UploadFile[] => {
        const medias: UploadFile[] = [];
        data?.tourScheduleMedias?.forEach((item: AnyObject) => {
            if (!item.id || !item.mediaFileId || !item.mediaFileName) return;
            medias.push({
                uid: item.id,
                percent: 50,
                name: item.mediaFileName,
                status: 'done',
                url: `${item.mediaFileFilePath}`,
            });
        });
        return medias;
    };

    const fetchTour = useCallback(async () => {
        if (props.tourData) {
            setFileList([]);
            setMediaList([]);
        }
        setFileList(props.files ?? []);
    }, [props.tourData, props.files, setMediaList]);

    const removeMedia = async (file: UploadFile<string>) => {
        const response = await deleteTourMedia(file.uid);
        if (response) {
            toastSuccess(i18n.t('tour.tourDetail.media'), i18n.t('message.tour.deleteMediaSuccess'));
            return;
        }
    };

    const onFinish = async () => {
        const tourScheduleId = tourScheduleFormStatus.tourScheduleId ?? tourSchedule?.id;
        if (!tourScheduleId || mediaList.length == 0) {
            setTourScheduleFormStatus({
                ...tourScheduleFormStatus,
                isUploadMediaFormSuccess: true,
            });
            return;
        }

        const mediaTour = mediaList.map(async (item: UploadFile) => {
            if (item.url) {
                const response = await fetch(`${item.url}`);
                const data = await response.blob();
                const file = new File([data], item.name);
                return createTourMedias({ tourScheduleId: tourScheduleId, file });
            } else {
                return createTourMedias({ tourScheduleId: tourScheduleId, file: item as RcFile });
            }
        });

        try {
            await Promise.all(mediaTour);
        } finally {
            setFileList([]);
            setMediaList([]);
            setTourScheduleFormStatus({
                ...tourScheduleFormStatus,
                isUploadMediaFormSuccess: true,
            });
        }
    };

    useEffect(() => {
        fetchTour();
    }, [fetchTour]);

    return (
        <Form form={props.uploadFileForm} onFinish={onFinish}>
            <div className="px-5 py-7">
                <Dragger {..._props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">{i18n.t('tour.tourDetail.contentMedia')}</p>
                    <p className="ant-upload-hint">{i18n.t('tour.tourDetail.fileSupport')}</p>
                </Dragger>
                <Upload
                    listType="picture"
                    className="container media-grid"
                    fileList={mapFileList(tourSchedule)}
                    onRemove={removeMedia}
                    showUploadList={{
                        showRemoveIcon: hasPermission,
                    }}
                ></Upload>
            </div>
        </Form>
    );
};
