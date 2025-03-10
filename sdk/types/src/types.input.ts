import type { Worker as NodeWorker } from 'worker_threads';

export type ScryptedNativeId = string | undefined;

/**
 * All devices in Scrypted implement ScryptedDevice, which contains the id, name, and type. Add listeners to subscribe to events from that device.
 * 
 * @category Core Reference
 */
export interface ScryptedDevice {
  /**
   * Subscribe to events from a specific interface on a device, such as 'OnOff' or 'Brightness'.
   */
  listen(event: ScryptedInterface | string | EventListenerOptions, callback: EventListener): EventListenerRegister;

  setName(name: string): Promise<void>;

  setRoom(room: string): Promise<void>;

  setType(type: ScryptedDeviceType): Promise<void>;

  /**
   * Probes the device, ensuring creation of it and any mixins.
   */
  probe(): Promise<boolean>;

  id?: string;
  nativeId?: ScryptedNativeId;
  pluginId?: string;
  interfaces?: string[];
  mixins?: string[];
  name?: string;
  info?: DeviceInformation;
  providedInterfaces?: string[];
  providedName?: ScryptedDeviceType;
  providedRoom?: string;
  providedType?: ScryptedDeviceType;
  providerId?: string;
  room?: string;
  type?: ScryptedDeviceType;
}
export interface ScryptedPlugin {
  getPluginJson(): Promise<any>;
}
export interface EventListenerOptions {
  /**
   * This EventListener will denoise events, and will not be called unless the state changes.
   */
  denoise?: boolean;
  /**
   * The EventListener will subscribe to this event interface.
   */
  event?: ScryptedInterface | string;
  /**
   * This EventListener will passively watch for events, and not initiate polling.
   */
  watch?: boolean;
}

/**
 * @category Core Reference
 */
export type EventListener = (eventSource: ScryptedDevice | undefined, eventDetails: EventDetails, eventData: any) => void;

export interface EventDetails {
  eventId: string;
  changed?: boolean;
  eventInterface?: string;
  eventTime: number;
  property?: string;
}
/**
 * Returned when an event listener is attached to an EventEmitter. Call removeListener to unregister from events.
 * 
 * @category Core Reference
*/
export interface EventListenerRegister {
  removeListener(): void;

}

/**
 * @category Core Reference
 */
export enum ScryptedDeviceType {
  Builtin = "Builtin",
  Camera = "Camera",
  Fan = "Fan",
  Light = "Light",
  Switch = "Switch",
  Outlet = "Outlet",
  Sensor = "Sensor",
  Scene = "Scene",
  Program = "Program",
  Automation = "Automation",
  Vacuum = "Vacuum",
  Notifier = "Notifier",
  Thermostat = "Thermostat",
  Lock = "Lock",
  PasswordControl = "PasswordControl",
  /**
   * Displays have audio and video output.
   */
  Display = "Display",
  /**
   * Smart Displays have two way audio and video.
   */
  SmartDisplay = "SmartDisplay",
  Speaker = "Speaker",
  /**
   * Smart Speakers have two way audio.
   */
  SmartSpeaker = "SmartSpeaker",
  Event = "Event",
  Entry = "Entry",
  Garage = "Garage",
  DeviceProvider = "DeviceProvider",
  DataSource = "DataSource",
  API = "API",
  Doorbell = "Doorbell",
  Irrigation = "Irrigation",
  Valve = "Valve",
  Person = "Person",
  SecuritySystem = "SecuritySystem",
  Unknown = "Unknown",
}
/**
 * OnOff is a basic binary switch.
 */
export interface OnOff {
  turnOff(): Promise<void>;

  turnOn(): Promise<void>;

  on?: boolean;
}
/**
 * Brightness is a lighting device that can be dimmed/lit between 0 to 100.
 */
export interface Brightness {
  setBrightness(brightness: number): Promise<void>;

  brightness?: number;
}
/**
 * ColorSettingTemperature sets the color temperature of a light in Kelvin.
 */
export interface ColorSettingTemperature {
  getTemperatureMaxK(): Promise<number>;

  getTemperatureMinK(): Promise<number>;

  setColorTemperature(kelvin: number): Promise<void>;

  colorTemperature?: number;
}
/**
 * ColorSettingRgb sets the color of a colored light using the RGB representation.
 */
export interface ColorSettingRgb {
  setRgb(r: number, g: number, b: number): Promise<void>;

  rgb?: ColorRgb;
}
/**
 * Represents an RGB color with component values between 0 and 255.
 */
export interface ColorRgb {
  b?: number;
  g?: number;
  r?: number;
}
/**
 * ColorSettingHsv sets the color of a colored light using the HSV representation.
 */
export interface ColorSettingHsv {
  setHsv(hue: number, saturation: number, value: number): Promise<void>;

  hsv?: ColorHsv;
}
/**
 * Represents an HSV color value component.
 */
export interface ColorHsv {
  /**
   * Hue. 0 to 360.
   */
  h?: number;
  /**
   * Saturation. 0 to 1.
   */
  s?: number;
  /**
   * Value. 0 to 1.
   */
  v?: number;
}

export interface NotifierOptions {
  subtitle?: string;
  actions?: NotificationAction[];
  badge?: string;
  bodyWithSubtitle?: string;
  body?: string;
  data?: any;
  dir?: NotificationDirection;
  lang?: string;
  renotify?: boolean;
  requireInteraction?: boolean;
  silent?: boolean;
  tag?: string;
  timestamp?: EpochTimeStamp;
  vibrate?: VibratePattern;
}

/**
 * Notifier can be any endpoint that can receive messages, such as speakers, phone numbers, messaging clients, etc. The messages may optionally contain media.
 */
export interface Notifier {
  sendNotification(title: string, options?: NotifierOptions, media?: MediaObject | string, icon?: MediaObject | string): Promise<void>;
}
/**
 * MediaObject is an intermediate object within Scrypted to represent all media objects. Plugins should use the MediaConverter to convert the Scrypted MediaObject into a desired type, whether it is a externally accessible URL, a Buffer, etc.
 * 
 * @category Media Reference
 */
export interface MediaObject {
  mimeType: string;
  sourceId?: string;
}
/**
 * StartStop represents a device that can be started, stopped, and possibly paused and resumed. Typically vacuum cleaners or washers.
 */
export interface StartStop {
  start(): Promise<void>;

  stop(): Promise<void>;

  running?: boolean;
}
export interface Pause {
  pause(): Promise<void>;

  resume(): Promise<void>;

  paused?: boolean;
}
/**
 * Dock instructs devices that have a base station or charger, to return to their home.
 */
export interface Dock {
  dock(): Promise<void>;

  docked?: boolean;
}
/**
 * TemperatureSetting represents a thermostat device.
 */
export interface TemperatureSetting {
  setThermostatMode(mode: ThermostatMode): Promise<void>;

  setThermostatSetpoint(degrees: number): Promise<void>;

  setThermostatSetpointHigh(high: number): Promise<void>;

  setThermostatSetpointLow(low: number): Promise<void>;

  thermostatAvailableModes?: ThermostatMode[];
  thermostatMode?: ThermostatMode;
  thermostatActiveMode?: ThermostatMode;
  thermostatSetpoint?: number;
  thermostatSetpointHigh?: number;
  thermostatSetpointLow?: number;
}
export enum HumidityMode {
  Humidify = "Humidify",
  Dehumidify = "Dehumidify",
  Auto = "Auto",
  Off = "Off",
}
export interface HumidityCommand {
  mode?: HumidityMode;
  humidifierSetpoint?: number;
  dehumidifierSetpoint?: number;
}
export interface HumiditySettingStatus {
  mode: HumidityMode;
  activeMode?: HumidityMode;
  availableModes: HumidityMode[];
  humidifierSetpoint?: number;
  dehumidifierSetpoint?: number;
}
export interface HumiditySetting {
  humiditySetting?: HumiditySettingStatus;
  setHumidity(humidity: HumidityCommand): Promise<void>;
}
export enum FanMode {
  Auto = "Auto",
  Manual = "Manual",
}
export interface FanStatus {
  /**
   * Rotations per minute, if available, otherwise 0 or 1.
   */
  speed: number;
  mode?: FanMode;
  active?: boolean;
  /**
   * Rotations per minute, if available.
   */
  maxSpeed?: number;
  counterClockwise?: boolean;
  availableModes?: FanMode[];
  swing?: boolean;
}
export interface FanState {
  speed?: number;
  mode?: FanMode;
  counterClockwise?: boolean;
  swing?: boolean;
}
export interface Fan {
  fan?: FanStatus;
  setFan(fan: FanState): Promise<void>;
}
export interface Thermometer {
  /**
   * Get the ambient temperature in Celsius.
   */
  temperature?: number;
  /**
   * Get the user facing unit of measurement for this thermometer, if any. Note that while this may be Fahrenheit, getTemperatureAmbient will return the temperature in Celsius.
   */
  temperatureUnit?: TemperatureUnit;
  setTemperatureUnit(temperatureUnit: TemperatureUnit): Promise<void>;
}
export enum TemperatureUnit {
  C = "C",
  F = "F",
}
export interface HumiditySensor {
  humidity?: number;
}
export enum ThermostatMode {
  Off = "Off",
  Cool = "Cool",
  Heat = "Heat",
  HeatCool = "HeatCool",
  Auto = "Auto",
  FanOnly = "FanOnly",
  Purifier = "Purifier",
  Eco = "Eco",
  Dry = "Dry",
  On = "On",
}
export interface PictureDimensions {
  width?: number;
  height?: number;
}
export interface PictureOptions {
  id?: string;
  /**
   * The native dimensions of the camera.
   */
  picture?: PictureDimensions;
}
export interface ResponsePictureOptions extends PictureOptions {
  name?: string;
  /**
   * Flag that indicates that the request supports resizing to custom dimensions.
   */
  canResize?: boolean;
}
export interface RequestPictureOptions extends PictureOptions {
  reason?: 'user' | 'event';
  /**
   * Flag that hints whether this user request is happening due to a periodic refresh.
   */
  periodicRequest?: boolean;
  /**
   * Flag that hints whether multiple cameras are being refreshed by this user request. Can be used to prefetch the snapshots.
   */
  bulkRequest?: boolean;
}
/**
 * Camera devices can take still photos.
 */
export interface Camera {
  takePicture(options?: RequestPictureOptions): Promise<MediaObject>;
  getPictureOptions(): Promise<ResponsePictureOptions[]>;
}

export interface H264Info {
  sei?: boolean;
  stapb?: boolean;
  mtap16?: boolean;
  mtap32?: boolean;
  fuab?: boolean;
  reserved0?: boolean;
  reserved30?: boolean;
  reserved31?: boolean;
}

export interface VideoStreamOptions {
  codec?: string;
  profile?: string;
  width?: number;
  height?: number;
  bitrate?: number;
  bitrateControl?: 'variable' | 'constant';
  minBitrate?: number;
  maxBitrate?: number;
  fps?: number;
  /**
   * Key Frame interval in milliseconds.
   */
  idrIntervalMillis?: number;
  /**
   * Key Frame interval in frames.
   */
  keyframeInterval?: number;
  h264Info?: H264Info;
}

export interface AudioStreamOptions {
  codec?: string;
  encoder?: string;
  profile?: string;
  bitrate?: number;
}

export type MediaStreamSource = "local" | "cloud";
export type MediaStreamTool = 'ffmpeg' | 'scrypted' | 'gstreamer';

/**
 * Options passed to VideoCamera.getVideoStream to
 * request specific media formats.
 * The audio/video properties may be omitted
 * to indicate no audio/video is available when
 * calling getVideoStreamOptions or no audio/video
 * is requested when calling getVideoStream.
 */
export interface MediaStreamOptions {
  id?: string;
  name?: string;
  /**
   * Prebuffer time in milliseconds.
   */
  prebuffer?: number;
  /**
   * Prebuffer size in bytes.
   */
  prebufferBytes?: number;
  /**
   * The container type of this stream, ie: mp4, mpegts, rtsp.
   */
  container?: string;

  /**
  * Stream specific metadata.
  */
  metadata?: any;

  /**
   * The tool was used to write the container or will be used to read teh container. Ie, scrypted,
   * the ffmpeg tools, gstreamer.
   */
  tool?: MediaStreamTool;

  video?: VideoStreamOptions;
  audio?: AudioStreamOptions;
}

export interface ResponseMediaStreamOptions extends MediaStreamOptions {
  id: string;
  /**
   * The time in milliseconds that this stream must be refreshed again
   * via a call to getVideoStream.
   */
  refreshAt?: number;

  source?: MediaStreamSource;
  userConfigurable?: boolean;
  sdp?: string;

  /**
   * The stream's codec parameters are not contained in the stream
   * and are available out of band via another mechanism such as the SDP.
   */
  oobCodecParameters?: boolean;

  destinations?: MediaStreamDestination[];
}

export type MediaStreamDestination = "local" | "remote" | "medium-resolution" | "low-resolution" | "local-recorder" | "remote-recorder";

export interface RequestMediaStreamOptions extends MediaStreamOptions {
  /**
   * When retrieving media, setting disableMediaProxies=true
   * will bypass any intermediaries (NVR, rebroadcast) and retrieve
   * it directly from the source. This is useful in cases when
   * peer to peer connections are possible and preferred, such as WebRTC.
   */
  directMediaStream?: boolean;

  /**
   * Specify the stream refresh behavior when this stream is requested.
   * Use case is primarily for perioidic snapshot of streams
   * while they are active.
   * @default true
   */
  refresh?: boolean;

  /**
   * The intended destination for this media stream. May be used as
   * a hint to determine which main/substream to send if no id
   * is explicitly provided.
   */
  destination?: MediaStreamDestination;

  /**
   * The destination id for this media stream. This should generally be
   * the IP address of the destination, if known. May be used by to
   * determine stream selection and track dynamic bitrate history.
   */
  destinationId?: string;

  /**
   * Request an adaptive bitrate stream, if available. The destination
   * will need to report packet loss indication.
   */
  adaptive?: boolean;
}

export interface MediaStreamPacketLoss {
  ssrc: number;
  highestSequence: number;
  packetsLost: number;
}

export interface MediaStreamFeedback {
  onRtcp(buffer: Buffer): Promise<void>;
  requestBitrate(bitrate: number): Promise<void>;
  requestKeyframe(): Promise<void>;
  reportPacketLoss(report: MediaStreamPacketLoss): Promise<void>;
  reportPictureLoss(): Promise<void>;
  reportEstimatedMaxBitrate(bitrate: number): Promise<void>;
}

/**
 * Microphone devices can capture audio streams.
 */
export interface Microphone {
  getAudioStream(): Promise<MediaObject>;
}

/**
 * VideoCamera devices can capture video streams.
 */
export interface VideoCamera {
  /**
   * Get a video stream.
   * @param options The media stream to fetch. If the id is specified, the exact
   * stream will be retrieved. Otherwise, the returned stream will be implementation
   * dependent.
   * If no options are provided at all, the implementation must return the
   * first stream listed in getVideoStreamOptions.
   */
  getVideoStream(options?: RequestMediaStreamOptions): Promise<MediaObject>;
  /**
   * Get the available video streaming options.
   */
  getVideoStreamOptions(): Promise<ResponseMediaStreamOptions[]>;
}

export interface VideoCameraConfiguration {
  setVideoStreamOptions(options: MediaStreamOptions): Promise<void>;
}

export interface RequestRecordingStreamOptions extends RequestMediaStreamOptions {
  startTime: number;
  duration?: number;
  loop?: boolean;
  playbackRate?: number;
}

export interface RecordingStreamThumbnailOptions {
  detectionId?: string;
  resize?: {
    width?: number;
    height?: number;
    percent?: boolean;
  };
  crop?: {
    left: number;
    top: number;
    width: number;
    height: number;
    percent?: boolean;
  };
}

export interface VideoRecorder {
  /**
   * Returns a MediaObject for a recording stream.
   * @param options Options that denote where to start the recording stream.
   * If a duration is specified, a downloadable stream will be returned.
   * If a duration is not specified, a playback stream will be returned.
   * @param recordingStream Optionally provide a previously returned recording stream
   * to seek to a new position within that stream. If the seek is successful, the previous
   * MediaObject will update its playback position and no MediaObject will be returned.
   */
  getRecordingStream(options: RequestRecordingStreamOptions, recordingStream?: MediaObject): Promise<MediaObject>;
  getRecordingStreamCurrentTime(recordingStream: MediaObject): Promise<number>;
  getRecordingStreamOptions(): Promise<ResponseMediaStreamOptions[]>;
  getRecordingStreamThumbnail(time: number, options?: RecordingStreamThumbnailOptions): Promise<MediaObject>;
}

export interface RecordedEvent {
  details: EventDetails;
  data: any;
}

export interface RecordedEventOptions {
  startTime?: number;
  endTime?: number;
  startId?: string;
  count?: number;
  reverseOrder?: boolean;
}

export interface EventRecorder {
  getRecordedEvents(options: RecordedEventOptions): Promise<RecordedEvent[]>;
}

export interface VideoClip {
  id: string;
  startTime: number;
  duration?: number;
  event?: string;
  description?: string;
  detectionClasses?: ObjectDetectionClass[];
  thumbnailId?: string;
  videoId?: string;
}

export interface VideoClipOptions {
  startTime?: number;
  endTime?: number;
  startId?: string;
  count?: number;
  reverseOrder?: boolean;
}

export interface VideoClips {
  getVideoClips(options?: VideoClipOptions): Promise<VideoClip[]>;
  getVideoClip(videoId: string): Promise<MediaObject>;
  getVideoClipThumbnail(thumbnailId: string): Promise<MediaObject>;
  removeVideoClips(...videoClipIds: string[]): Promise<void>;
}

/**
 * Intercom devices can playback audio. 
 */
export interface Intercom {
  startIntercom(media: MediaObject): Promise<void>;
  stopIntercom(): Promise<void>;
}

export interface PanTiltZoomCommand {
  horizontal?: 'left' | 'right';
  vertical?: 'up' | 'down';
}

export interface PanTiltZoom {
  ptzCapabilities: any;

  ptzCommand(command: PanTiltZoomCommand): Promise<void>;
}

/**
 * Display devices can play back audio and video.
 */
export interface Display {
  startDisplay(media: MediaObject): Promise<void>;
  stopDisplay(media: MediaObject): Promise<void>;
}

/**
 * Lock controls devices that can lock or unlock entries. Often works in tandem with PasswordControl.
 */
export interface Lock {
  lock(): Promise<void>;

  unlock(): Promise<void>;

  lockState?: LockState;
}
export enum LockState {
  Locked = "Locked",
  Unlocked = "Unlocked",
  Jammed = "Jammed",
}
/**
 * PasswordControl represents devices that authorize users via a passcode or pin code.
 */
export interface PasswordStore {
  addPassword(password: string): Promise<void>;

  getPasswords(): Promise<string[]>;

  removePassword(password: string): Promise<void>;

}
/**
 * Authenticator can be used to require a password before allowing interaction with a security device.
 */
export interface Authenticator {
  checkPassword(password: string): Promise<boolean>;

}
/**
 * Scenes control multiple different devices into a given state.
 */
export interface Scene {
  activate(): Promise<void>;

  deactivate(): Promise<void>;

  /**
   * If a scene can be reversed, isReversible should return true. Otherwise deactivate will not be called.
   */
  isReversible(): boolean;

}
/**
 * Entry represents devices that can open and close barriers, such as garage doors.
 */
export interface Entry {
  closeEntry(): Promise<void>;

  openEntry(): Promise<void>;

}
export interface EntrySensor {
  entryOpen?: boolean;
}
/**
 * DeviceManager is the interface used by DeviceProvider to report new devices, device states, and device events to Scrypted.
 * 
 * @category Device Provider Reference
 */
export interface DeviceManager {
  /**
   * Get the logger for a device given a native id.
   */
  getDeviceLogger(nativeId?: ScryptedNativeId): Logger;

  /**
   * Get the console for the device given a native id.
   */
  getDeviceConsole?(nativeId?: ScryptedNativeId): Console;

  /**
   * Get the console for the device given a native id.
   */
  getMixinConsole?(mixinId: string, nativeId?: ScryptedNativeId): Console;

  /**
   * Get the device state maintained by Scrypted. Setting properties on this state will update the state in Scrypted.
   */
  getDeviceState(nativeId?: ScryptedNativeId): DeviceState;

  /**
   * Create a device state object that will trap all state setting calls. Used internally by mixins and fork.
   */
  createDeviceState?(id: string, setState: (property: string, value: any) => Promise<void>): DeviceState;

  /**
   * Get the storage for a mixin.
   * @param id The id of the device being mixined.
   * @param nativeId The nativeId of the MixinProvider.
   */
  getMixinStorage(id: string, nativeId?: ScryptedNativeId): Storage;

  /**
   * Fire an event for a mixin provided by this plugin.
   */
  onMixinEvent(id: string, mixinDevice: any, eventInterface: string, eventData: any): Promise<void>;

  /**
  * Get the device Storage object.
  */
  getDeviceStorage(nativeId?: ScryptedNativeId): Storage;

  /**
   * Get all the native ids that have been reported by this plugin. This always includes "undefined", the plugin itself.
   */
  getNativeIds(): string[];

  /**
   * onDeviceDiscovered is used to report new devices that are trickle discovered, one by one, such as via a network broadcast.
   */
  onDeviceDiscovered(device: Device): Promise<string>;

  /**
   * Fire an event for a device provided by this plugin.
   */
  onDeviceEvent(nativeId: ScryptedNativeId, eventInterface: string, eventData: any): Promise<void>;

  /**
   * onDeviceRemoved is used to report when discovered devices are removed.
   */
  onDeviceRemoved(nativeId: ScryptedNativeId): Promise<void>;

  /**
   * onDevicesChanged is used to sync Scrypted with devices that are attached to a hub, such as Hue or SmartThings. All the devices should be reported at once.
   */
  onDevicesChanged(devices: DeviceManifest): Promise<void>;

  /**
   * Restart the plugin. May not happen immediately.
   */
  requestRestart(): Promise<void>;
}
/**
 * DeviceProvider acts as a controller/hub and exposes multiple devices to Scrypted Device Manager.
 * 
 * @category Device Provider Reference
 */
export interface DeviceProvider {
  /**
   * Get an instance of a previously discovered device that was reported to the device manager.
   * This method will be called every time onDeviceDiscovered or onDevicesChanged is invoked
   * by the plugin. A previously returned instance may be returned again. If a different
   * instance is returned, the plugin is responsible for cleaning up the old instance.
   */
  getDevice(nativeId: ScryptedNativeId): Promise<any>;
  /**
   * Called when a previously returned device from getDevice was deleted from Scrypted.
   */
  releaseDevice(id: string, nativeId: ScryptedNativeId, device: any): Promise<void>;
}
/**
 * DeviceManifest is passed to DeviceManager.onDevicesChanged to sync a full list of devices from the controller/hub (Hue, SmartThings, etc)
 * 
 * @category Device Provider Reference
 */
export interface DeviceManifest {
  /**
   * The native id of the hub or discovery DeviceProvider that manages these devices.
   */
  providerNativeId?: ScryptedNativeId;
  devices?: Device[];
}
export interface DeviceCreatorSettings {
  [key: string]: SettingValue;
}
/**
 * A DeviceProvider that allows the user to create a device.
 * 
 * @category Device Provider Reference
 */
export interface DeviceCreator {
  getCreateDeviceSettings(): Promise<Setting[]>;
  /**
   * Implementation should return the native id of the created device.
   * Callers will receive the id of the created device.
   */
  createDevice(settings: DeviceCreatorSettings): Promise<string>;
}
/**
 * A DeviceProvider that has a device discovery mechanism.
 * 
 * @category Device Provider Reference
 */
export interface DeviceDiscovery {
  /**
   * Perform device discovery for the specified duration in seconds.
   */
  discoverDevices(duration: number): Promise<void>;
}
/**
 * Battery retrieves the battery level of battery powered devices.
 */
export interface Battery {
  batteryLevel?: number;
}
/**
 * Refresh indicates that this device has properties that are not automatically updated, and must be periodically refreshed via polling. Device implementations should never implement their own underlying polling algorithm, and instead implement Refresh to allow Scrypted to manage polling intelligently.
 * 
 * @category Device Provider Reference
 */
export interface Refresh {
  /**
   * Get the recommended refresh/poll frequency in seconds for this device.
   */
  getRefreshFrequency(): Promise<number>;

  /**
   * This method is called by Scrypted when the properties of the device need to be refreshed. When the device has completed the refresh, the appropriate DeviceState properties should be set. The parameters provide the specific interface that needs to be refreshed and whether it was user initiated (via UI or voice).
   */
  refresh(refreshInterface: string, userInitiated: boolean): Promise<void>;

}
/**
 * MediaPlayer allows media playback on screen or speaker devices, such as Chromecasts or TVs.
 */
export interface MediaPlayer {
  getMediaStatus(): Promise<MediaStatus>;

  load(media: string | MediaObject, options?: MediaPlayerOptions): Promise<void>;

  seek(milliseconds: number): Promise<void>;

  skipNext(): Promise<void>;

  skipPrevious(): Promise<void>;

}
export interface MediaPlayerOptions {
  autoplay?: boolean;
  mimeType?: string;
  title?: string;
}
/**
 * Online denotes whether the device is online or unresponsive. It may be unresponsive due to being unplugged, network error, etc.
 */
export interface Online {
  online?: boolean;
}
export interface Program {
  /**
   * Asynchronously run a script given the provided arguments.
   */
  run(variables?: { [name: string]: any }): Promise<any>;

}
export interface ScriptSource {
  name?: string;
  script?: string;
  language?: string;
  monacoEvalDefaults?: string;
}
export interface Scriptable {
  saveScript(script: ScriptSource): Promise<void>;
  loadScripts(): Promise<{ [filename: string]: ScriptSource }>;
  eval(source: ScriptSource, variables?: { [name: string]: any }): Promise<any>;
}
/**
 * SoftwareUpdate provides a way to check for updates and install them. This may be a Scrypted Plugin or device firmware.
 */
export interface SoftwareUpdate {
  checkForUpdate(): Promise<boolean>;

  installUpdate(): Promise<void>;

  updateAvailable?: boolean;
}

export interface BufferConvertorOptions {
  sourceId?: string;
}

/**
 * Add a converter to be used by Scrypted to convert buffers from one mime type to another mime type.
 * May optionally accept string urls if accept-url is a fromMimeType parameter.
 */
export interface BufferConverter {
  convert(data: string | Buffer | any, fromMimeType: string, toMimeType: string, options?: BufferConvertorOptions): Promise<MediaObject | Buffer | any>;

  fromMimeType?: string;
  toMimeType?: string;
}
/**
 * Settings viewing and editing of device configurations that describe or modify behavior.
 */
export interface Settings {
  getSettings(): Promise<Setting[]>;

  putSetting(key: string, value: SettingValue): Promise<void>;

}
export interface BinarySensor {
  binaryState?: boolean;
}
export type TamperState = 'intrusion' | 'motion' | 'magnetic' | 'cover' | true | false;
export interface TamperSensor {
  tampered?: TamperState;
}
export interface PowerSensor {
  powerDetected?: boolean;
}
export interface AudioSensor {
  audioDetected?: boolean;
}
export interface MotionSensor {
  motionDetected?: boolean;
}
export interface AmbientLightSensor {
  /**
   * The ambient light in lux.
   */
  ambientLight: number;
}
export interface OccupancySensor {
  occupied?: boolean;
}
export interface FloodSensor {
  flooded?: boolean;
}
export interface UltravioletSensor {
  ultraviolet?: number;
}
export interface LuminanceSensor {
  luminance?: number;
}
export interface Position {
  /**
   * The accuracy radius of this position in meters.
   */
  accuracyRadius?: number;
  latitude?: number;
  longitude?: number;
}
export interface PositionSensor {
  position?: Position;
}
export interface PM10Sensor {
  pm10Density?: number;
}
export interface PM25Sensor {
  pm25Density?: number;
}
export interface VOCSensor {
  vocDensity?: number;
}
export interface NOXSensor {
  noxDensity?: number;
}
export interface CO2Sensor {
  co2ppm?: number;
}
export enum AirQuality {
  Unknown = "Unknown",
  Excellent = "Excellent",
  Good = "Good",
  Fair = "Fair",
  Inferior = "Inferior",
  Poor = "Poor",
}
export interface AirQualitySensor {
  airQuality?: AirQuality;
}

export enum SecuritySystemMode {
  Disarmed = 'Disarmed',
  HomeArmed = 'HomeArmed',
  AwayArmed = 'AwayArmed',
  NightArmed = 'NightArmed',
}

export enum SecuritySystemObstruction {
  Sensor = 'Sensor',
  Occupied = 'Occupied',
  Time = 'Time',
  Error = 'Error',
}

export interface SecuritySystemState {
  mode: SecuritySystemMode;
  triggered?: boolean;
  supportedModes?: SecuritySystemMode[];
  obstruction?: SecuritySystemObstruction;
}

export interface SecuritySystem {
  securitySystemState?: SecuritySystemState;
  armSecuritySystem(mode: SecuritySystemMode): Promise<void>;
  disarmSecuritySystem(): Promise<void>;
}

export interface ObjectDetectionHistory {
  firstSeen: number;
  lastSeen: number;
}
export interface BoundingBoxResult {
  /**
   * x, y, width, height
   */
  boundingBox?: [number, number, number, number];
  zoneHistory?: { [zone: string]: ObjectDetectionHistory };
  zones?: string[];
  history?: ObjectDetectionHistory;
}
export interface ObjectDetectionResult extends BoundingBoxResult {
  id?: string;
  className: ObjectDetectionClass;
  score: number;
}
export interface ObjectsDetected {
  /**
   * Object detection session state. Will be true if processing video, until
   * the video ends or is timed out.
   */
  running?: boolean;
  detections?: ObjectDetectionResult[];
  /**
   * The id for the detection session.
   */
  detectionId?: string;
  /**
   * The id for this specific event/frame within a detection video session.
   * Will be undefined for single image detections.
   */
  eventId?: any;
  inputDimensions?: [number, number],
  timestamp: number;
}
export type ObjectDetectionClass = 'motion' | 'face' | 'person' | string;
export interface ObjectDetectionTypes {
  /**
   * Classes of objects that can be recognized. This can include motion
   * or the names of specific people.
   */
  classes?: ObjectDetectionClass[];
}
/**
 * ObjectDetector is found on Cameras that have smart detection capabilities.
 */
export interface ObjectDetector {
  /**
   * Get the media (image or video) that contains this detection.
   * @param detectionId
   */
  getDetectionInput(detectionId: string, eventId?: any): Promise<MediaObject>;
  getObjectTypes(): Promise<ObjectDetectionTypes>;
}
export interface ObjectDetectionSession {
  detectionId?: string;
  duration?: number;
  settings?: { [key: string]: any };
}
export interface ObjectDetectionModel extends ObjectDetectionTypes {
  name: string;
  inputSize?: number[];
  settings: Setting[];
  inputStream?: MediaStreamDestination;
}
export interface ObjectDetectionCallbacks {
  onDetection(detection: ObjectsDetected, mediaObject?: MediaObject): Promise<boolean>;
  onDetectionEnded(detection: ObjectsDetected): Promise<void>;
}
/**
 * ObjectDetection can run classifications or analysis on arbitrary media sources.
 * E.g. TensorFlow, OpenCV, or a Coral TPU.
 */
export interface ObjectDetection {
  detectObjects(mediaObject: MediaObject, session?: ObjectDetectionSession, callbacks?: ObjectDetectionCallbacks): Promise<ObjectsDetected>;
  getDetectionModel(settings?: { [key: string]: any }): Promise<ObjectDetectionModel>;
}
/**
 * Logger is exposed via log.* to allow writing to the Scrypted log.
 */
export interface Logger {
  /**
   * Alert. Alert level logs will be displayed as a notification in the management console.
   */
  a(msg: string): void;

  /**
   * Clear the log
   */
  clear(): void;

  /**
   * Clear a specific alert
   */
  clearAlert(msg: string): void;

  /**
   * Clear all alerts
   */
  clearAlerts(): void;

  /**
   * Debug
   */
  d(msg: string): void;

  /**
   * Error
   */
  e(msg: string): void;

  /**
   * Info
   */
  i(msg: string): void;

  /**
   * Verbose
   */
  v(msg: string): void;

  /**
   * Warn
   */
  w(msg: string): void;

}
export interface Readme {
  getReadmeMarkdown(): Promise<string>;
}
/**
 * The OauthClient can be implemented to perform the browser based Oauth process from within a plugin.
 */
export interface OauthClient {
  /**
   * Get the Oauth URL to navigate to in the browser. The redirect_uri parameter is not needed and will be automatically set by Scrypted.
   */
  getOauthUrl(): Promise<string>;

  /**
   * When an oauth request by a plugin completes, the callback url, with the code/token, will be passed to this method.
   */
  onOauthCallback(callbackUrl: string): Promise<void>;

}

export interface MediaObjectOptions {
  /**
   * The device id of the source of the MediaObject.
   */
  sourceId?: string;
}

/**
 * @category Media Reference
 */
export interface MediaManager {
  /**
   * Add an convertor to consider for use when converting MediaObjects.
   */
  addConverter(converter: BufferConverter): Promise<void>;
  clearConverters(): Promise<void>;

  /**
   * Convert a media object to a Buffer, primtive type, or RPC Object.
   */
  convertMediaObject<T>(mediaObject: MediaObject, toMimeType: string): Promise<T>;

  /**
   * Convert a media object to a Buffer of the given mime type, and them parse it as JSON.
   */
  convertMediaObjectToJSON<T>(mediaObject: MediaObject, toMimeType: string): Promise<T>;

  /**
   * Convert a media object to a Buffer of the given mime type.
   */
  convertMediaObjectToBuffer(mediaObject: MediaObject, toMimeType: string): Promise<Buffer>;

  /**
   * Convert a media object to a locally accessible URL that serves a media file of the given mime type. If the media object is an externally accessible URL, that will be returned.
   */
  convertMediaObjectToInsecureLocalUrl(mediaObject: string | MediaObject, toMimeType: string): Promise<string>;

  /**
   * Convert a media object to a locally accessible URL that serves a media file of the given mime type. If the media object is an externally accessible URL, that will be returned.
   */
  convertMediaObjectToLocalUrl(mediaObject: string | MediaObject, toMimeType: string): Promise<string>;

  /**
   * Convert a media object to a publically accessible URL that serves a media file of the given mime type.
   */
  convertMediaObjectToUrl(mediaObject: string | MediaObject, toMimeType: string): Promise<string>;

  /**
   * Create a MediaObject from FFmpeg input arguments.
   */
  createFFmpegMediaObject(ffmpegInput: FFmpegInput, options?: MediaObjectOptions): Promise<MediaObject>;

  /**
   * Create a MediaObject from an URL. The mime type will be determined dynamically while resolving the url.
   */
  createMediaObjectFromUrl(data: string, options?: MediaObjectOptions): Promise<MediaObject>;

  /**
   * Create a MediaObject.
   * If the data is a buffer, JSON object, or primitive type, it will be serialized.
   * All other objects will be objects will become RPC objects.
   */
  createMediaObject(data: any | Buffer, mimeType: string, options?: MediaObjectOptions): Promise<MediaObject>;

  /**
   * Get the path to ffmpeg on the host system.
   */
  getFFmpegPath(): Promise<string>;

  /**
   * Get the directory where the plugin should store files.
   */
  getFilesPath(): Promise<string>;
}
export interface MediaStreamUrl {
  url: string;
  container?: string;
  mediaStreamOptions?: ResponseMediaStreamOptions;
}
export interface FFmpegInput extends MediaStreamUrl {
  inputArguments?: string[];
  destinationVideoBitrate?: number;
  h264EncoderArguments?: string[];
  videoDecoderArguments?: string[];
  h264FilterArguments?: string[];
}
export interface DeviceInformation {
  model?: string;
  manufacturer?: string;
  version?: string;
  firmware?: string;
  serialNumber?: string;
  mac?: string;
  metadata?: any;
  managementUrl?: string;
}
/**
 * Device objects are created by DeviceProviders when new devices are discover and synced to Scrypted via the DeviceManager.
 * 
 * @category Device Provider Reference
 */
export interface Device {
  name: string;
  /**
   * The native id that is used by the DeviceProvider used to internally identify provided devices.
   */
  nativeId: ScryptedNativeId;
  type: ScryptedDeviceType;
  interfaces: string[];
  info?: DeviceInformation;
  /**
   * The native id of the hub or discovery DeviceProvider that manages this device.
   */
  providerNativeId?: ScryptedNativeId;
  room?: string;

  internal?: boolean;
}
/**
 * EndpointManager provides publicly accessible URLs that can be used to contact your Scrypted Plugin.
 * 
 * @category Webhook and Push Reference
 */
export interface EndpointManager {
  /**
   * Get an URL pathname for a device that can be accessed with authentication. This is a relative path that can be used in browser sessions.
   * @deprecated
   */
  getAuthenticatedPath(nativeId?: ScryptedNativeId): Promise<string>;

  /**
  * Get an URL that can only be accessed on your local network by anyone with the link. HTTP requests and responses are without any encryption. Plugin implementation is responsible for authentication.
  * @deprecated
  */
  getInsecurePublicLocalEndpoint(nativeId?: ScryptedNativeId): Promise<string>;

  /**
   * Get an URL that can only be accessed on your local network by anyone with the link. HTTP requests and responses are over SSL with a self signed certificate. Plugin implementation is responsible for authentication.
   * @deprecated
   */
  getPublicLocalEndpoint(nativeId?: ScryptedNativeId): Promise<string>;

  /**
   * Get an URL that can be used to send a push message to the client. This differs from a cloud endpoint, in that, the Plugin does not send a response back. Plugin implementation is responsible for authentication.
   * @deprecated
   */
  getPublicPushEndpoint(nativeId?: ScryptedNativeId): Promise<string>;

  /**
   * Get an URL that can be externally accessed by anyone with the link. Plugin implementation is responsible for authentication.
   * @deprecated
   */
  getPublicCloudEndpoint(nativeId?: ScryptedNativeId): Promise<string>;

  /**
   * Get an URL pathname for a device that can be accessed without authentication. This is a relative path that can be used in browser sessions.
   */
  getPath(nativeId?: ScryptedNativeId, options?: {
    public?: boolean,
  }): Promise<string>;

  /**
   * Get an URL that can only be accessed on your local network by anyone with the link.
   */
  getLocalEndpoint(nativeId?: string, options?: {
    /**
     * A public endpoint that does not require authentication with the local Scrypted server.
     */
    public?: boolean,
    /**
     * An insecure endpoint served by http, not https.
     */
    insecure?: boolean,
  }): Promise<string>;

  /**
   * Get an URL that can be externally accessed by anyone with the link. Plugin implementation is responsible for authentication.
   * @deprecated
   */
  getCloudEndpoint(nativeId?: ScryptedNativeId, options?: {
    /**
     * A public endpoint that does not require authentication with the local Scrypted server.
     */
    public?: boolean,
  }): Promise<string>;

  /**
   * Get an URL that can be used to send a push message to the client. This differs from a cloud endpoint, in that, the Plugin does not send a response back.
   */
  getCloudPushEndpoint(nativeId?: ScryptedNativeId): Promise<string>;

  /**
   * Deliver a push notification to a device. Used by push providers.
   */
  deliverPush(id: string, request: HttpRequest): Promise<void>;

  /**
   * Set the recommended local addresses used by Scrypted plugins that listen for incoming connections.
   * @param addresses
   */
  setLocalAddresses(addresses: string[]): Promise<void>;

  /**
   * Get the recommended local addresess used by Scrypted plugins that listen for incoming connections.
   */
  getLocalAddresses(): Promise<string[]>;
}
/**
 * SystemManager is used by scripts to query device state and access devices.
 * 
 * @category Core Reference
 */
export interface SystemManager {
  /**
   * Retrieve a system service.
   */
  getComponent(id: string): Promise<any>;

  /**
   * Find a Scrypted device by id.
   */
  getDeviceById(id: string): ScryptedDevice;

  /**
   * Find a Scrypted device by id.
   */
  getDeviceById<T>(id: string): ScryptedDevice & T;

  /**
   * Find a Scrypted device by name.
   */
  getDeviceByName(name: string): ScryptedDevice;

  /**
   * Find a Scrypted device by name.
   */
  getDeviceByName<T>(name: string): ScryptedDevice & T;

  /**
   * Get the current state of a device.
   * @deprecated
   */
  getDeviceState(id: string): { [property: string]: SystemDeviceState };

  /**
   * Get the current state of every device.
   */
  getSystemState(): { [id: string]: { [property: string]: SystemDeviceState } };

  /**
   * Passively (without polling) listen to property changed events.
   */
  listen(callback: EventListener): EventListenerRegister;

  /**
   * Subscribe to events from a specific interface on a device id, such as 'OnOff' or 'Brightness'. This is a convenience method for ScryptedDevice.listen.
   */
  listenDevice(id: string, event: ScryptedInterface | string | EventListenerOptions, callback: EventListener): EventListenerRegister;

  /**
   * Remove a device from Scrypted. Plugins should use DeviceManager.onDevicesChanged or DeviceManager.onDeviceRemoved to remove their own devices
   */
  removeDevice(id: string): Promise<void>;

}
/**
 * MixinProviders can add and intercept interfaces to other devices to add or augment their behavior.
 * 
 * @category Mixin Reference
 */
export interface MixinProvider {
  /**
   * Called by the system to determine if this provider can create a mixin for the supplied device. Returns null if a mixin can not be created, otherwise returns a list of new interfaces (which may be an empty list) that are provided by the mixin.
   */
  canMixin(type: ScryptedDeviceType, interfaces: string[]): Promise<string[]>;

  /**
   * Create a mixin that can be applied to the supplied device.
   */
  getMixin(mixinDevice: any, mixinDeviceInterfaces: ScryptedInterface[], mixinDeviceState: DeviceState): Promise<any>;

  /**
   * Release a mixin device that was previously returned from getMixin.
   */
  releaseMixin(id: string, mixinDevice: any): Promise<void>;
}
/**
 * The HttpRequestHandler allows handling of web requests under the endpoint path: /endpoint/npm-package-name/*.
 * 
 * @category Webhook and Push Reference
 */
export interface HttpRequestHandler {
  /**
   * Callback to handle an incoming request.
   */
  onRequest(request: HttpRequest, response: HttpResponse): Promise<void>;

}
/**
 * @category Webhook and Push Reference
 */
export interface HttpRequest {
  body?: string;
  headers?: { [header: string]: string };
  isPublicEndpoint?: boolean;
  method?: string;
  rootPath?: string;
  url?: string;
  username?: string;
}
/**
 * Response object provided by the HttpRequestHandler.
 * 
 * @category Webhook and Push Reference
 */
export interface HttpResponse {
  send(body: string): void;

  send(body: string, options: HttpResponseOptions): void;

  send(body: Buffer): void;

  send(body: Buffer, options: HttpResponseOptions): void;

  sendFile(path: string): void;

  sendFile(path: string, options: HttpResponseOptions): void;

  sendSocket(socket: any, options: HttpResponseOptions): void;
}
/**
 * @category Webhook and Push Reference
 */
export interface HttpResponseOptions {
  code?: number;
  headers?: object;
}
export interface EngineIOHandler {
  onConnection(request: HttpRequest, webSocketUrl: string): Promise<void>;

}
/**
 * @category Webhook and Push Reference
 * 
 */
export interface PushHandler {
  /**
   * Callback to handle an incoming push.
   */
  onPush(request: HttpRequest): Promise<void>;

}
export interface SystemDeviceState {
  /**
   * The last time the state was updated, even if it did not change.
   */
  lastEventTime?: number;
  /**
   * The last time the state changed.
   */
  stateTime?: number;
  value?: any;
}
export interface MediaStatus {
  duration?: number;
  mediaPlayerState?: MediaPlayerState;
  metadata?: any;
  position?: number;
}
export enum MediaPlayerState {
  Idle = "Idle",
  Playing = "Playing",
  Paused = "Paused",
  Buffering = "Buffering",
}
export type SettingValue = undefined | null | string | number | boolean | string[] | number[];
export interface Setting {
  key?: string;
  title?: string;
  group?: string;
  description?: string;
  placeholder?: string;
  type?: 'string' | 'password' | 'number' | 'boolean' | 'device' | 'integer' | 'button' | 'clippath' | 'interface' | 'qrcode' | 'textarea';
  /**
   * The range of allowed numbers, if any, when the type is 'number'.
   */
  range?: [number, number];
  readonly?: boolean;
  choices?: string[];
  combobox?: boolean;
  deviceFilter?: string;
  multiple?: boolean;
  value?: SettingValue;
}

export interface LauncherApplicationInfo {
  name?: string;
  /**
   * Supports: mdi-icon, fa-icon, urls.
   */
  icon?: string;
  description?: string;
  href?: string;
}

export interface LauncherApplication {
  applicationInfo?: LauncherApplicationInfo;
}

export enum ScryptedInterface {
  ScryptedDevice = "ScryptedDevice",
  ScryptedPlugin = "ScryptedPlugin",
  OnOff = "OnOff",
  Brightness = "Brightness",
  ColorSettingTemperature = "ColorSettingTemperature",
  ColorSettingRgb = "ColorSettingRgb",
  ColorSettingHsv = "ColorSettingHsv",
  Notifier = "Notifier",
  StartStop = "StartStop",
  Pause = "Pause",
  Dock = "Dock",
  TemperatureSetting = "TemperatureSetting",
  Thermometer = "Thermometer",
  HumiditySensor = "HumiditySensor",
  Camera = "Camera",
  Microphone = "Microphone",
  Display = "Display",
  VideoCamera = "VideoCamera",
  VideoRecorder = "VideoRecorder",
  PanTiltZoom = "PanTiltZoom",
  EventRecorder = "EventRecorder",
  VideoClips = "VideoClips",
  VideoCameraConfiguration = "VideoCameraConfiguration",
  Intercom = "Intercom",
  Lock = "Lock",
  PasswordStore = "PasswordStore",
  Authenticator = "Authenticator",
  Scene = "Scene",
  Entry = "Entry",
  EntrySensor = "EntrySensor",
  DeviceProvider = "DeviceProvider",
  DeviceDiscovery = "DeviceDiscovery",
  DeviceCreator = "DeviceCreator",
  Battery = "Battery",
  Refresh = "Refresh",
  MediaPlayer = "MediaPlayer",
  Online = "Online",
  SoftwareUpdate = "SoftwareUpdate",
  BufferConverter = "BufferConverter",
  Settings = "Settings",
  BinarySensor = "BinarySensor",
  TamperSensor = "TamperSensor",
  PowerSensor = "PowerSensor",
  AudioSensor = "AudioSensor",
  MotionSensor = "MotionSensor",
  AmbientLightSensor = "AmbientLightSensor",
  OccupancySensor = "OccupancySensor",
  FloodSensor = "FloodSensor",
  UltravioletSensor = "UltravioletSensor",
  LuminanceSensor = "LuminanceSensor",
  PositionSensor = "PositionSensor",
  SecuritySystem = 'SecuritySystem',
  PM10Sensor = "PM10Sensor",
  PM25Sensor = "PM25Sensor",
  VOCSensor = "VOCSensor",
  NOXSensor = "NOXSensor",
  CO2Sensor = "CO2Sensor",
  AirQualitySensor = "AirQualitySensor",
  Readme = "Readme",
  OauthClient = "OauthClient",
  MixinProvider = "MixinProvider",
  HttpRequestHandler = "HttpRequestHandler",
  EngineIOHandler = "EngineIOHandler",
  PushHandler = "PushHandler",
  Program = "Program",
  Scriptable = "Scriptable",
  ObjectDetector = "ObjectDetector",
  ObjectDetection = "ObjectDetection",
  HumiditySetting = "HumiditySetting",
  Fan = "Fan",
  RTCSignalingChannel = "RTCSignalingChannel",
  RTCSignalingClient = "RTCSignalingClient",
  LauncherApplication = "LauncherApplication",
}

/**
 * @category WebRTC Reference
 */
export type RTCSignalingSendIceCandidate = (candidate: RTCIceCandidateInit) => Promise<void>;

/**
 * Implemented by WebRTC cameras to negotiate a peer connection session with Scrypted.
 * 
 * @category WebRTC Reference
 */
export interface RTCSignalingSession {
  createLocalDescription(type: 'offer' | 'answer', setup: RTCAVSignalingSetup, sendIceCandidate: undefined | RTCSignalingSendIceCandidate): Promise<RTCSessionDescriptionInit>;
  setRemoteDescription(description: RTCSessionDescriptionInit, setup: RTCAVSignalingSetup): Promise<void>;
  addIceCandidate(candidate: RTCIceCandidateInit): Promise<void>;
  getOptions(): Promise<RTCSignalingOptions>;
}

/**
 * @category WebRTC Reference
 */
export interface RTCSignalingOptions {
  /**
   * Indicates that this client requires an answer, and is providing an offer.
   */
  offer?: RTCSessionDescriptionInit;
  requiresOffer?: boolean;
  disableTrickle?: boolean;
  /**
   * Hint to proxy the feed, as the target client may be inflexible.
   */
  proxy?: boolean;
  capabilities?: {
    video?: RTCRtpCapabilities;
    audio?: RTCRtpCapabilities;
  };
  userAgent?: string;
  screen?: {
    width: number;
    height: number;
  };
}

/**
 * A flexible RTC signaling endpoint, typically a browser, that can handle offer and answer. 
 * Like Chromecast, etc, which has a Chromecast AppId that can connect to Scrypted.
 */
export interface RTCSignalingClient {
  createRTCSignalingSession(): Promise<RTCSignalingSession>;
}

/**
 * @category WebRTC Reference
 */
export interface RTCSessionControl {
  getRefreshAt(): Promise<number | void>;
  extendSession(): Promise<void>;
  endSession(): Promise<void>;
  setPlayback(options: {
    audio: boolean,
    video: boolean,
  }): Promise<void>;
}
/**
 * @category WebRTC Reference
 */
export interface RTCMediaObjectTrack {
  replace(mediaObject: MediaObject): Promise<void>;
  stop(): Promise<void>;
  setPlayback(options: {
    audio: boolean,
    video: boolean,
  }): Promise<void>;
}

/**
 * @category WebRTC Reference
 */
export interface RTCConnectionManagement {
  negotiateRTCSignalingSession(): Promise<void>;
  addTrack(mediaObject: MediaObject, options?: {
    videoMid?: string,
    audioMid?: string,
    intercomId?: string,
  }): Promise<RTCMediaObjectTrack>;
  close(): Promise<void>;
  probe(): Promise<void>;
}

/**
 * An inflexible RTC Signaling channel, typically a vendor, like Nest or Ring.
 * They generally can only handle either offer or answer, but not both. Usually has
 * strict requirements and expectations on client setup.
 * 
 * @category WebRTC Reference
 */
export interface RTCSignalingChannel {
  startRTCSignalingSession(session: RTCSignalingSession): Promise<RTCSessionControl | undefined>;
}

/**
 * @category WebRTC Reference
 */
export interface RTCAVSignalingSetup {
  /**
   * Mechanism to allow configuration of TURN/STUN servers, etc.
   */
  configuration?: RTCConfiguration;
  audio: RTCRtpTransceiverInit;
  video: RTCRtpTransceiverInit;
  datachannel?: {
    label: string;
    dict?: RTCDataChannelInit;
  };
  type: 'offer' | 'answer';
}

export enum ScryptedMimeTypes {
  Url = 'text/x-uri',
  InsecureLocalUrl = 'text/x-insecure-local-uri',
  LocalUrl = 'text/x-local-uri',

  PushEndpoint = 'text/x-push-endpoint',

  SchemePrefix = 'x-scrypted/x-scrypted-scheme-',

  MediaStreamUrl = 'text/x-media-url',
  MediaObject = 'x-scrypted/x-scrypted-media-object',
  RequestMediaObject = 'x-scrypted/x-scrypted-request-media-object',
  RequestMediaStream = 'x-scrypted/x-scrypted-request-stream',
  MediaStreamFeedback = 'x-scrypted/x-media-stream-feedback',
  ScryptedDevice = 'x-scrypted/x-scrypted-device',
  ScryptedDeviceId = 'x-scrypted/x-scrypted-device-id',

  FFmpegInput = 'x-scrypted/x-ffmpeg-input',
  FFmpegTranscodeStream = 'x-scrypted/x-ffmpeg-transcode-stream',

  RTCSignalingChannel = 'x-scrypted/x-scrypted-rtc-signaling-channel',
  RTCSignalingSession = 'x-scrypted/x-scrypted-rtc-signaling-session',
  RTCConnectionManagement = 'x-scrypted/x-scrypted-rtc-connection-management',
}

export type RequestMediaObject = () => Promise<MediaObject>;
export type RequestMediaStream = (options?: RequestMediaStreamOptions) => Promise<MediaObject>;

export interface FFmpegTranscode {
  videoDecoderArguments?: string[];
  videoTranscodeArguments?: string[];
  audioTranscodeArguments?: string[];
}
export type FFmpegTranscodeStream = (options: FFmpegTranscode) => Promise<void>;

export interface PluginFork<T> {
  result: Promise<T>;
  worker: NodeWorker;
}

export interface ScryptedStatic {
  /**
   * @deprecated
   */
  log?: Logger,

  deviceManager: DeviceManager,
  endpointManager: EndpointManager,
  mediaManager: MediaManager,
  systemManager: SystemManager,

  pluginHostAPI: any;
  pluginRemoteAPI: any;

  fork?<T>(): PluginFork<T>;
}

export declare interface DeviceState {
  id?: string;
  setState?(property: string, value: any): Promise<void>;
}

export interface ScryptedInterfaceDescriptor {
  name: string;
  properties: string[];
  methods: string[];
}
