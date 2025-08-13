import { BaseModel } from "@/core/models/base-model";

export interface DocumentModel extends BaseModel {
  fileName: string;
  filePath: string;
  fileType: string;
  fileSize: string;
  activityId: string;
  companyId: string;
  serviceRecordId: string;
}
